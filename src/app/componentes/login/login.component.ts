import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private router: Router,
		private routerActivo: ActivatedRoute,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.googleCallback();
		// this.login();
	}


	login(){
		let token = this.authService.getToken();
		console.log(token);
		
		if (token) {
			this.router.navigate(['home']);
		}

	}

	google(){
		// this.router.navigate(['mis-registros']);
		window.location.href = 'http://localhost:5000/auth/google';
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
			(error) => {
				console.log(error);
				
			});
	}
}
