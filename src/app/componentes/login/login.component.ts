import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private router: Router,
		private routerActivo: ActivatedRoute,
		private authService: AuthService,
		private _mensajes: MensajesService
	) { }

	ngOnInit() {
		this.googleCallback();
		// this.login();
	}


	login(){
		let token = this.authService.getToken();
		
		if (token) {
			// this.router.navigate(['home']);
			window.location.href = "/home";
		}else{
			// this._mensajes.enviar("");
		}

	}

	google(){
		// this.router.navigate(['mis-registros']);
		window.location.href = this.authService.URL + '/auth/google';
	}
	
	googleCallback(){
		this.routerActivo.params.subscribe(
			(params) => {
				console.log(params);
				if (params.token) {
					if (params.expires) {
						this.authService.saveToken(params.token, params.expires);
						this.login();
					}
				}
			},
			(err) => this._mensajes.enviar(err.error.message));
	}
}
