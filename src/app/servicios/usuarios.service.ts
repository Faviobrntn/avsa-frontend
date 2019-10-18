import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../modelos/usuario";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
	
	user: Usuario;
	users: Usuario[];
	readonly URL_API = 'http://localhost:5000/api/usuarios';

	constructor(private http: HttpClient) { }
	  
	/**
	 * getAll
	 */
	public getAll() {
		return this.http.get(this.URL_API);
	}

	/**
	 * get
	 */
	public get(id: string) {
		return this.http.get(this.URL_API + `/$(id)/`);
	}

	/**
	 * nuevo
	 */
	public nuevo(usuario: Usuario) {
		return this.http.post(this.URL_API, usuario);
	}


	/**
	 * actualizar
	 */
	public actualizar(usuario: Usuario) {
		return this.http.put(this.URL_API + `/$(usuario._id)/`, usuario);
	}


	/**
	 * eliminar
	 */
	public eliminar(id: string) {
		return this.http.delete(this.URL_API + `/$(id)/`);
	}

}
