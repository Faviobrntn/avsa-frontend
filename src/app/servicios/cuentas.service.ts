import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cuenta, CuentaApi } from '../modelos/cuenta';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CuentasService {
	// user: Cuenta;
	// users: Cuenta[];
	readonly URL: string = 'http://localhost:5000/api';
	readonly URL_API: string = 'http://localhost:5000/api/cuentas';

	// headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
	headers = { 'authorization': this.authService.getToken()};

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) { 
		// let token = this.authService.getToken();
		// this.headers.append('authorization', token);
	}

	/**
	 * tabla
	 */
	public tabla(requestUrl) {
		return this.http.get<CuentaApi>(this.URL_API + '/tabla' +requestUrl, {
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
	 * get Listado
	 */
	public listado() {
		return this.http.get(this.URL_API + '/listado', {
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
	 * get Saldo
	 */
	public saldo(id: string) {
		return this.http.get(this.URL_API + '/saldo/' + id, {
			headers: this.headers
		});
	}
	
	/**
	 * get Saldos
	 */
	public saldos() {
		return this.http.get(this.URL_API + '/saldos', {
			headers: this.headers
		});
	}

	/**
	 * nuevo
	 */
	public nuevo(entidad: Cuenta) {
		return this.http.post(this.URL_API, entidad, {
			headers: this.headers
		});
	}


	/**
	 * actualizar
	 */
	public actualizar(entidad: Cuenta) {
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
}
