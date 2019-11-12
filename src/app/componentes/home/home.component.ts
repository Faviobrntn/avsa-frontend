import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {		  
	/** Based on the screen size, switch from standard to one column per row */
	cardsCuentas = null;
	cards = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(({ matches }) => {
				if (matches) {
					return [
						{ title: 'Saldos', cols: 2, rows: 1 },
						// { title: 'Card 3', cols: 2, rows: 1 },
						// { title: 'Card 4', cols: 2, rows: 1 }
					];
				}

				return [
					{ title: 'Saldos', cols: 1, rows: 1 },
					// { title: 'Card 3', cols: 1, rows: 2 },
					// { title: 'Card 4', cols: 1, rows: 1 }
				];
			})
		);

	cuentas: string[] = []; 
	saldo = 0; 

  	constructor(
		private breakpointObserver: BreakpointObserver,
		private _cuentasService: CuentasService,
		private _mensajes: MensajesService
	){
		
		// this.getCuentas();

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
							console.log(matches);
							console.log(resp);
							
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
}
