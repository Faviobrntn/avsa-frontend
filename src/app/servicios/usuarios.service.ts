import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../modelos/usuario";
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
	
	user: Usuario;
	users: Usuario[];
	readonly URL: string = 'https://avsaa.herokuapp.com/api';
	readonly URL_API: string = 'https://avsaa.herokuapp.com/api/usuarios';

	headers = { 'authorization': this.authService.getToken() };

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) { }
	  
	/**
	 * getAll
	 */
	public getAll() {
		return this.http.get(this.URL_API, {
			headers: this.headers
		});
	}

	/**
	 * get
	 */
	public get(id: string) {
		return this.http.get(this.URL_API + `/$(id)/`, {
			headers: this.headers
		});
	}

	/**
	 * nuevo
	 */
	public nuevo(usuario: Usuario) {
		return this.http.post(this.URL_API, usuario, {
			headers: this.headers
		});
	}


	/**
	 * actualizar
	 */
	public actualizar(usuario: Usuario) {
		return this.http.put(this.URL_API + `/$(usuario._id)/`, usuario, {
			headers: this.headers
		});
	}


	/**
	 * eliminar
	 */
	public eliminar(id: string) {
		return this.http.delete(this.URL_API + `/$(id)/`, {
			headers: this.headers
		});
	}
	
	
	/**
	 * Usuario actual
	 */
	public current_user() {
		return this.http.get(this.authService.URL + `/current`, {
			headers: this.headers
		});
	}


	/**
	 * Guardar cuenta por defecto
	 */
	public setCuentaDefault(id:string) {
		return this.http.put(this.URL_API + '/cuenta_default', {cuenta: id}, {
			headers: this.headers
		});
	}

}
