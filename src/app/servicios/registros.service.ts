import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../modelos/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

	readonly URL_API = 'http://localhost:5000/api/registros';

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
		return this.http.get(this.URL_API + '/' + id);
	}

	/**
	 * nuevo
	 */
	public nuevo(entidad: Registro) {
		return this.http.post(this.URL_API, entidad);
	}


	/**
	 * actualizar
	 */
	public actualizar(entidad: Registro) {
		return this.http.put(this.URL_API + '/' + entidad._id, entidad);
	}


	/**
	 * eliminar
	 */
	public eliminar(id: string) {
		return this.http.delete(this.URL_API + '/' + id);
	}
}
