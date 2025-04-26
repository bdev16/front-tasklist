import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: isError ? ['snack-error'] : ['snack-success']
    });
  }
  
}
