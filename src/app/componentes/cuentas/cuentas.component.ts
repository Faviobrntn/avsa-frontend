import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Cuenta } from 'src/app/modelos/cuenta';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogosComponent } from '../dialogos/dialogos.component';


@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements AfterViewInit {
	displayedColumns: string[] = ['nombre', 'valor_inicial', 'moneda', 'createdAt', 'accion'];
	cuentasDatabase: CuentasDataSource | null;
	data: Cuenta[] = [];

	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(
		private _httpClient: HttpClient,
		private cuentasServicio: CuentasService,
		private _mensajes: MensajesService,
		public dialog: MatDialog
	) { }

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
		this.cuentasServicio.get(id).subscribe(
			(resp: Cuenta) => {
				const datos = {
					"Nombre": resp.nombre,
					"Valor inicial": resp.valor_inicial,
					"Moneda": resp.moneda.nombre,
					"Tipo": resp.tipo,
					"Color": resp.color,
					"Creado": (new Date(resp.createdAt)).toLocaleDateString(),
					"Actualizado": (new Date(resp.updatedAt)).toLocaleDateString(),
					"Descripción": resp.descripcion
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

	eliminar(id: string){
		if (confirm("Se va a eliminar la fila seleccionada. ¿Desea continuar?")) {
			this.cuentasServicio.eliminar(id).subscribe(
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

export interface CuentaApi {
	items: Cuenta[];
	total_count: number;
}


/** An example database that the data source uses to retrieve data for the table. */
export class CuentasDataSource {
	constructor(private _httpClient: HttpClient) { }

	getRepoIssues(sort: string, order: string, page: number, limit: number, q:string = ''): Observable<CuentaApi> {
		const href = 'http://localhost:5000/api/cuentas/tabla';
		const requestUrl =
			`${href}?q=${sort}&sort=${sort}&order=${order}&page=${page + 1}&limit=${limit}`;

		// this._httpClient.get<CuentaApi>(requestUrl).subscribe(resp => console.log(resp));
		return this._httpClient.get<CuentaApi>(requestUrl);
	}
}