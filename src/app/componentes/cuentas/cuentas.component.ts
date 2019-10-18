import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Cuenta } from 'src/app/modelos/cuenta';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements AfterViewInit {
	displayedColumns: string[] = ['nombre', 'valor_inicial', 'moneda'];
	cuentasDatabase: CuentasDataSource | null;
	data: Cuenta[] = [];

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(private _httpClient: HttpClient) { }

	ngAfterViewInit() {
		this.cuentasDatabase = new CuentasDataSource(this._httpClient);

		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.cuentasDatabase!.getRepoIssues(
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

export interface CuentaApi {
	items: Cuenta[];
	total_count: number;
}

// export interface GithubIssue {
// 	created_at: string;
// 	number: string;
// 	state: string;
// 	title: string;
// }

/** An example database that the data source uses to retrieve data for the table. */
export class CuentasDataSource {
	constructor(private _httpClient: HttpClient) { }

	getRepoIssues(sort: string, order: string, page: number): Observable<CuentaApi> {
		const href = 'http://localhost:5000/api/cuentas/tabla';
		const requestUrl =
			`${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

		this._httpClient.get<CuentaApi>(requestUrl).subscribe(resp => console.log(resp));
		return this._httpClient.get<CuentaApi>(requestUrl);
	}
}