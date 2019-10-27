import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../modelos/usuario";
import { JwtResponse } from "../modelos/jwt-response";
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	readonly URL_API: string = 'http://localhost:5000/api/';
	// AUTH_SERVER: string = 'http://localhost:5000/api/';
	authSubject = new BehaviorSubject(false);
	public token: string;

	constructor(private http: HttpClient) { }

	register(user: Usuario): Observable<JwtResponse>{
		return this.http.post<JwtResponse>(this.URL_API + '/register', user)
			.pipe(tap(
				(res:JwtResponse) => {
					if(res){
						// guardar token

						this.saveToken(res.dataUsuario.accessToken, res.dataUsuario.expiresIn);
					}
				}
			));
	}

	
	login(user: Usuario): Observable<JwtResponse>{
		return this.http.post<JwtResponse>(this.URL_API + '/login', user)
			.pipe(tap(
				(res:JwtResponse) => {
					if(res){
						// guardar token

						this.saveToken(res.dataUsuario.accessToken, res.dataUsuario.expiresIn);
					}
				}
			));
	}


	logout():void {
		this.token = '';
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem("EXPIRES_IN");
	}


	public saveToken(token: string, expires_in: string):void {
		localStorage.setItem("ACCESS_TOKEN", token);
		localStorage.setItem("EXPIRES_IN", expires_in);
		this.token = token;
	}

	public getToken():string {
		if (!this.token) {
			this.token = localStorage.getItem("ACCESS_TOKEN");
		}

		return this.token;
		
	}
}
