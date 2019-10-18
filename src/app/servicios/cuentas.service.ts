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
	 * get
	 */
	public get(id: string) {
		return this.http.get(this.URL_API + `/$(id)/`);
	}

	/**
	 * nuevo
	 */
	public nuevo(cuenta: Cuenta) {
		return this.http.post(this.URL_API, cuenta);
	}


	/**
	 * actualizar
	 */
	public actualizar(cuenta: Cuenta) {
		return this.http.put(this.URL_API + `/$(usuario._id)/`, cuenta);
	}


	/**
	 * eliminar
	 */
	public eliminar(id: string) {
		return this.http.delete(this.URL_API + `/$(id)/`);
	}
}
