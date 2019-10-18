import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  	providedIn: 'root'
})
export class MensajesService {
	
	constructor(private _snackBar: MatSnackBar) { }

	enviar(message: string, action: string = "Cerrar") {
		this._snackBar.open(message, action, {
			duration: 2000,
		});
	}
}
