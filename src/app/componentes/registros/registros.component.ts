import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Registro } from 'src/app/modelos/registro';
import { RegistrosService } from 'src/app/servicios/registros.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogosComponent } from '../dialogos/dialogos.component';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements AfterViewInit {
	displayedColumns: string[] = ['fecha_hora', 'tipo', 'importe', 'estado', 'cuenta', 'createdAt', 'accion'];
	registroDatabase: RegistrosDataSource | null;
	data: Registro[] = [];

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(
		private _httpClient: HttpClient,
		private registroServicio: RegistrosService,
		private _mensajes: MensajesService,
		public dialog: MatDialog
	) { }

	ngAfterViewInit() {
		this.registroDatabase = new RegistrosDataSource(this._httpClient);

		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.registroDatabase!.getRepoIssues(
						this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
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

	ver(id: string) {
		this.registroServicio.get(id).subscribe(
			(resp: Registro) => {
				const datos = {
					"Nombre": resp.tipo,
					"Valor inicial": resp.importe,
					"Tipo": resp.estado,
					"Color": resp.fecha_hora,
					"Cuenta": resp.cuenta.nombre,
					"Creado": (new Date(resp.createdAt)).toLocaleDateString(),
					"Actualizado": (new Date(resp.updatedAt)).toLocaleDateString(),
					"Descripción": resp.notas
				}

				this.dialog.open(DialogosComponent, {
					data: datos,
				});
			},
			(err) => {
				this._mensajes.enviar(err.message);
				console.log(err);
			}
		);
	}

	eliminar(id: string) {
		if (confirm("Se va a eliminar la fila seleccionada. ¿Desea continuar?")) {
			this.registroServicio.eliminar(id).subscribe(
				(resp) => {
					this._mensajes.enviar("Se elimino con éxito");
					this.ngAfterViewInit();
				},
				(err) => {
					this._mensajes.enviar(err.message);
					console.log(err);
				}
			);
		}
	}
}

export interface RegistroApi {
	items: Registro[];
	total_count: number;
}


/** An example database that the data source uses to retrieve data for the table. */
export class RegistrosDataSource {
	constructor(private _httpClient: HttpClient) { }

	getRepoIssues(sort: string, order: string, page: number, limit: number): Observable<RegistroApi> {
		const href = 'http://localhost:5000/api/registros/tabla';
		const requestUrl =
			`${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}&limit=${limit}`;

		// this._httpClient.get<RegistroApi>(requestUrl).subscribe(resp => console.log(resp));
		return this._httpClient.get<RegistroApi>(requestUrl);
	}
}
