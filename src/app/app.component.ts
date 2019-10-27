import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend';
	estaLogeado = false;

	constructor(
		private authService: AuthService
	) { 
		// if (this.authService.getToken()) {
		// 	this.estaLogeado = true;
		// }
	}

}
