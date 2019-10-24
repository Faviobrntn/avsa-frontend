import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrosService } from 'src/app/servicios/registros.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { Registro } from 'src/app/modelos/registro';
import { Cuenta } from 'src/app/modelos/cuenta';

@Component({
  selector: 'app-registros-form',
  templateUrl: './registros-form.component.html',
  styleUrls: ['./registros-form.component.css']
})
export class RegistrosFormComponent {
	registro: Registro;
  
  	readonly URL_API = 'http://localhost:5000/api/';

  	registroForm = this.fb.group({
		tipo: [null, Validators.required],
		fecha_hora: [null, Validators.required],
		importe: [null, Validators.required],
		estado: null,
		notas: null,
		cuenta: [null, Validators.required]
	});
	  
	hasUnitNumber = false;

	cuentas: Cuenta[] = []; 

	constructor(
		private fb: FormBuilder,
		private _httpClient: HttpClient,
		private registrosServicio: RegistrosService,
		private router: Router,
		private routerActivo: ActivatedRoute,
		private _mensajes: MensajesService
	) {

		this.getCuentas();
		this.editar();
	}


	getCuentas() {
		const href = this.URL_API + 'cuentas/listado';
		this._httpClient.get(href).subscribe(
			(resp) => { this.cuentas = resp as Cuenta[]; },
			(err) => { console.log(err); }
		);
	}

	editar() {
		this.routerActivo.params.subscribe(
			(params) => {
				if (params.id) {
					this.registrosServicio.get(params.id).subscribe(
						(resp) => {
							this.registro = resp as Registro;
							console.log(resp);

							this.registroForm = this.fb.group({
								tipo: [this.registro.tipo, Validators.required],
								fecha_hora: [this.registro.fecha_hora, Validators.required],
								importe: [this.registro.importe, Validators.required],
								estado: this.registro.estado,
								notas: this.registro.notas,
								cuenta: [this.registro.cuenta._id, Validators.required]
							});

						},
						(err) => {
							this._mensajes.enviar(err);
							console.log(err);
						}
					);
				}
			}
		);
	}



	onSubmit() {
		const form = this.registroForm.value;
		console.log(form);

		if (!form.nombre) {
			this._mensajes.enviar("Nombre es obligatorio."); return;
		}
		if (!form.valor_inicial) {
			this._mensajes.enviar("El valor inicial es obligatorio."); return;
		}
		if (!form.cuenta) {
			this._mensajes.enviar("La cuenta es obligatoria."); return;
		}

		if (this.registro) {
			form._id = this.registro._id;
			this.registrosServicio.actualizar(form).subscribe(
				(resp) => {
					this._mensajes.enviar("Se guardo con éxito");
					this.router.navigate(['mis-cuentas']);
				},
				(err) => {
					this._mensajes.enviar(err);
					console.log(err);
				}
			);
		} else {
			this.registrosServicio.nuevo(form).subscribe(
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
