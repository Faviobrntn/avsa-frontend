import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../modelos/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
	// user: Cuenta;
	// users: Cuenta[];
	readonly URL_API = 'http://localhost:5000/api/cuentas';

	constructor(private http: HttpClient) { }

	/**
	 * getAll
	 */
	public getAll() {
		return this.http.get(this.URL_API);
	}

	/**
	 * get Listado
	 */
	public listado() {
		return this.http.get(this.URL_API + '/listado');
	}

	/**
	 * get
	 */
	public get(id: string) {
		return this.http.get(this.URL_API + '/' + id);
	}

	/**
	 * get Saldo
	 */
	public saldo(id: string) {
		return this.http.get(this.URL_API + '/saldo/' + id);
	}

	/**
	 * nuevo
	 */
	public nuevo(entidad: Cuenta) {
		return this.http.post(this.URL_API, entidad);
	}


	/**
	 * actualizar
	 */
	public actualizar(entidad: Cuenta) {
		return this.http.put(this.URL_API + '/' + entidad._id, entidad);
	}


	/**
	 * eliminar
	 */
	public eliminar(id: string) {
		return this.http.delete(this.URL_API + '/' + id);
	}
}
