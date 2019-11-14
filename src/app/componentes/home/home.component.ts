import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

export interface RegistrosTabla {
	_id: string;
	fecha: string;
	tipo: string;
	importe: number;
}
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {		  
	/** Based on the screen size, switch from standard to one column per row */
	cardsCuentas = null;
	cardsRegPend: RegistrosTabla[] = [];
	cardsRegPendColumns = ['fecha_hora', 'tipo', 'importe', 'accion'];

	cuentas: string[] = []; 
	saldo = 0; 

  	constructor(
		private breakpointObserver: BreakpointObserver,
		private _cuentasService: CuentasService,
		private _registrosService: RegistrosService,
		private _mensajes: MensajesService
	){
		
		// this.getCuentas();

		this.getRegistrosPendientes();
		this.getSaldosCuentas();
	}


	getCuentas() {
		this._cuentasService.listado().subscribe(
			(resp) => { this.cuentas = resp as string[]; },
			(err) => { this._mensajes.enviar(err.error.message); }
		);
	}
	getSaldoCuentas(id) {
		this._cuentasService.saldo(id).subscribe(
			(resp) => { this.saldo = resp as number; },
			(err) => { this._mensajes.enviar(err.error.message); }
		);
	}
	
	getSaldosCuentas() {
		this._cuentasService.saldos().subscribe(
			(resp) => { 
				// this.cardsCuentas = resp;
				this.cardsCuentas = this.breakpointObserver.observe(Breakpoints.Handset)
					.pipe(
						map(({ matches }) => {							
							if (matches) {
								for (const key in resp) {
									resp[key].cols = 4;
									resp[key].rows = 1;
								}								
							}else{
								for (const key in resp) {
									resp[key].cols = 1;
									resp[key].rows = 1;
								}
							}
							return resp;
						})
					);
			},
			(err) => { this._mensajes.enviar(err.error.message); }
		);
	}


	getRegistrosPendientes() {
		this._registrosService.getPorEstado('Pendiente').subscribe(
			(resp) => {
				this.cardsRegPend = resp as RegistrosTabla[];				
			},
			(err) => { this._mensajes.enviar(err.error.message); }
		);
	}


	cambiarEstado(id:string){
		if (confirm('El registro se va a marcar como "Procesado". ¿Desea continuar?')) {
			this._registrosService.cambiarEstado(id, 'Procesado').subscribe(
				(resp) => {
					this.getRegistrosPendientes();
				},
				(err) => { this._mensajes.enviar(err.error.message); }
			);
		}
	}
}
