import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
	selector: 'usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
	usuario: Usuario = {
		nombre: "",
		email: "",
		cuenta_default: "",
		imagen: ""
	};
	cuentas: string[] = [];

	constructor(
		private _usuariosService: UsuariosService,
		private _cuentasService: CuentasService,
		private _mensajes: MensajesService
	) { }

	ngOnInit(){
		this.getCuentas();
		// this.getCurrentUser();
	}
	ngAfterViewInit(){
		// this.getCuentas();
		this.getCurrentUser();
	}

	getCuentas() {
		this._cuentasService.listado().subscribe(
			(resp) => { this.cuentas = resp as string[];},
			(err) => { this._mensajes.enviar(err.error.message); }
		);
	}

	getCurrentUser() {
		this._usuariosService.current_user()
			.subscribe(
				(resp) => { this.usuario = resp as Usuario;},
				(err) => { this._mensajes.enviar(err.error.message); }
			);
	}


	setCuentaDefault(id){
		this._usuariosService.setCuentaDefault(id)
			.subscribe(
				(resp) => { 
					this._mensajes.enviar("Se actualizo con éxito.");
					console.log(resp);
					
					this.usuario = resp as Usuario; 
				},
				(err) => { this._mensajes.enviar(err.error.message); }
			);
		
	}
}