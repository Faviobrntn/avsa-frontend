import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Dictionary {
	[index: string]: string
} 

@Component({
	selector: 'dialogos',
	templateUrl: './dialogos.component.html',
	styleUrls: ['./dialogos.component.css']
})
export class DialogosComponent {
	constructor(
		public dialogRef: MatDialogRef<DialogosComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Dictionary) { }

	keys(): Array<string> {
		return Object.keys(this.data);
	} 

    values(): Array<string> {
		// console.log(this.data);
		
      	return Object.values(this.data);
	} 
	
	onNoClick(): void {
		this.dialogRef.close();
	}

}
