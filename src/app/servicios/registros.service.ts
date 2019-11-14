import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro, RegistroApi } from '../modelos/registro';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

	readonly URL: string = 'http://localhost:5000/api';
	readonly URL_API: string = 'http://localhost:5000/api/registros';

	readonly tipos = ['Ingreso', 'Gasto']; 
	readonly estados = ['Conciliado', 'Procesado', 'Pendiente']; 

	headers = { 'authorization': this.authService.getToken() };

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) { }


	/**
	 * tabla
	 */
	public tabla(requestUrl) {
		return this.http.get<RegistroApi>(this.URL_API + '/tabla' + requestUrl, {
			headers: this.headers
		});
	}

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
		return this.http.get(this.URL_API + '/' + id, {
			headers: this.headers
		});
	}

	/**
	 * nuevo
	 */
	public nuevo(entidad: Registro) {
		return this.http.post(this.URL_API, entidad, {
			headers: this.headers
		});
	}


	/**
	 * actualizar
	 */
	public actualizar(entidad: Registro) {
		return this.http.put(this.URL_API + '/' + entidad._id, entidad, {
			headers: this.headers
		});
	}


	/**
	 * eliminar
	 */
	public eliminar(id: string) {
		return this.http.delete(this.URL_API + '/' + id, {
			headers: this.headers
		});
	}


	/**
	 * getAll
	 */
	public getPorEstado(estado:string = "Pendiente") {
		return this.http.get(this.URL_API + '/estado/' + estado, {
			headers: this.headers
		});
	}
	
	/**
	 * getAll
	 */
	public cambiarEstado(id:string, estado:string) {
		return this.http.put(this.URL_API + '/cambiar_estado/' + id, { estado: estado}, {
			headers: this.headers
		});
	}
}
