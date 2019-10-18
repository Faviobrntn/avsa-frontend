import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
	selector: 'usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit {
	displayedColumns: string[] = ['nombre', 'email'];
	exampleDatabase: UsuariosDataSource | null;
	data: Usuario[] = [];

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(private _httpClient: HttpClient) { }

	ngAfterViewInit() {
		this.exampleDatabase = new UsuariosDataSource(this._httpClient);

		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.exampleDatabase!.getRepoIssues(
						this.sort.active, this.sort.direction, this.paginator.pageIndex);
				}),
				map(data => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.isRateLimitReached = false;
					this.resultsLength = data.total_count;

					return data.items;
				}),
				catchError(() => {
					this.isLoadingResults = false;
					// Catch if the GitHub API has reached its rate limit. Return empty data.
					this.isRateLimitReached = true;
					return observableOf([]);
				})
			).subscribe(data => this.data = data);
	}
}

export interface GithubApi {
	items: Usuario[];
	total_count: number;
}

// export interface GithubIssue {
// 	created_at: string;
// 	number: string;
// 	state: string;
// 	title: string;
// }

/** An example database that the data source uses to retrieve data for the table. */
export class UsuariosDataSource {
	constructor(private _httpClient: HttpClient) { }
	// constructor(private usuariosService: UsuariosService) { }

	getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
		const href = 'http://localhost:5000/api/usuarios/listado';
		const requestUrl =
			`${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

		return this._httpClient.get<GithubApi>(requestUrl);
	}
}