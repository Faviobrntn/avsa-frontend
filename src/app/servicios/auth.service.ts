import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { JwtResponse } from '../modelos/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	readonly URL: string = 'https://avsaa.herokuapp.com';
	readonly URL_API: string = 'https://avsaa.herokuapp.com/api/';
	// AUTH_SERVER: string = 'https://avsaa.herokuapp.com/api/';
	authSubject = new BehaviorSubject(false);
	public token: string = null;
	redirectUrl: string;

	estaLogeado = false;
	public respuesta: any = {
		accessToken: null,
		expiresIn: null
	};

	constructor(private http: HttpClient, private router: Router) {
		// this.checkLogin();
	}

	register(user: Usuario): Observable<JwtResponse> {
		return this.http.post<JwtResponse>(this.URL_API + '/register', user)
			.pipe(tap(
				(res: JwtResponse) => {
					if (res) {
						// guardar token

						this.saveToken(res.dataUsuario.accessToken, res.dataUsuario.expiresIn);
					}
				}
			));
	}


	login(user: Usuario): Observable<JwtResponse> {
		return this.http.post<JwtResponse>(this.URL_API + '/login', user)
			.pipe(tap(
				(res: JwtResponse) => {
					if (res) {
						// guardar token

						this.saveToken(res.dataUsuario.accessToken, res.dataUsuario.expiresIn);
					}
				}
			));
	}


	logout(): void {
		this.token = null;
		this.estaLogeado = false;
		localStorage.removeItem('ACCESS_TOKEN');
		localStorage.removeItem('EXPIRES_IN');

		// this.router.navigate(['/login']);
		// return false;
	}


	public saveToken(token: string, expires_in: string): void {
		localStorage.setItem('ACCESS_TOKEN', token);
		localStorage.setItem('EXPIRES_IN', expires_in);
		this.token = token;
	}

	public getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem('ACCESS_TOKEN');
		}

		return this.token;
	}


	private checkLogin() {
		return this.http.get(this.URL + `/verify`, {
			headers: { authorization: this.getToken() }
		}).subscribe(
			(resp: any) => {
				this.estaLogeado = true;

				if ('accessToken' in resp) {
					this.saveToken(resp.accessToken, resp.expiresIn);
				}
			},
			(err) => {
				// this.logout();
				this.router.navigate(['/login']);
				return false;
			}
		);
	}
}
