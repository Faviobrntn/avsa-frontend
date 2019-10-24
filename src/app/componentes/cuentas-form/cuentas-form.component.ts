import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Moneda } from 'src/app/modelos/moneda';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { Cuenta } from 'src/app/modelos/cuenta';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
	selector: 'app-cuentas-form',
	templateUrl: './cuentas-form.component.html',
	styleUrls: ['./cuentas-form.component.css']
})
export class CuentasFormComponent {
	cuenta: Cuenta;
	
	readonly URL_API = 'http://localhost:5000/api/';


	cuentaForm = this.fb.group({
		// id: [null],
		nombre: [null, Validators.required],
		valor_inicial: [null, Validators.required],
		color: null,
		tipo: null,
		descripcion: null,
		moneda: [null, Validators.required]
	});

  	hasUnitNumber = false;

  	monedas: Moneda[] = []; 

  	constructor(
		private fb: FormBuilder,
		private _httpClient: HttpClient,
		private cuentasServicio: CuentasService,
		private router: Router,
		private routerActivo: ActivatedRoute,
		private _mensajes: MensajesService
  	) {

    	this.getMonedas();
		this.editar();
  	}
  

  	getMonedas() {
	  	const href = this.URL_API +'monedas/listado';
    	this._httpClient.get(href).subscribe(
			(resp) => { this.monedas = resp as Moneda[]; }, 
			(err) => { console.log(err); }
    	);
	}
	
	editar(){
		this.routerActivo.params.subscribe(
			(params) => {
				if (params.id) {
					this.cuentasServicio.get(params.id).subscribe(
						(resp) => {
							this.cuenta = resp as Cuenta;
							console.log(resp);
							
							this.cuentaForm = this.fb.group({
								// id: this.cuenta._id,
								nombre: [this.cuenta.nombre, Validators.required],
								valor_inicial: [this.cuenta.valor_inicial, Validators.required],
								color: this.cuenta.color,
								tipo: this.cuenta.tipo,
								descripcion: this.cuenta.descripcion,
								moneda: [this.cuenta.moneda._id, Validators.required]
							});
							
						},
						(err) => {
							this._mensajes.enviar(err);
							console.log(err);
						}
					);
				}
			});

	}

  	onSubmit() {
		const form = this.cuentaForm.value;
		console.log(form);
		
		if (!form.nombre) { 
			this._mensajes.enviar("Nombre es obligatorio."); return; 
		}
		if (!form.valor_inicial) { 
			this._mensajes.enviar("El valor inicial es obligatorio."); return;
		}
		if (!form.moneda) { 
			this._mensajes.enviar("La moneda es obligatoria."); return; 
		}

		if (this.cuenta) {
			form._id = this.cuenta._id;
			this.cuentasServicio.actualizar(form).subscribe(
				(resp) => {
					this._mensajes.enviar("Se guardo con éxito");
					this.router.navigate(['mis-cuentas']);
				},
				(err) => { 
					this._mensajes.enviar(err);
					console.log(err);
				}
			);
		}else{
			this.cuentasServicio.nuevo(form).subscribe(
				(resp) => {
					this._mensajes.enviar("Se guardo con éxito");
					this.router.navigate(['mis-cuentas']);
				},
				(err) => { 
					this._mensajes.enviar(err);
					console.log(err);
				}
			);

		}    
    
  	}
}
