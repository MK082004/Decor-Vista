import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  notifiedStatusRequestDialog(dialogData: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: dialogData.maxWidth,
      data: dialogData,
      autoFocus: false
    });
  
    return dialogRef.afterClosed();
  }

  showMessage(message: string, isSuccess: boolean) {
    this.snackBar.open(message, '', {
      verticalPosition:  "bottom",
      horizontalPosition: "center",
      panelClass: isSuccess === true ? "snackbar-success" :  "snackbar-danger",
      duration : 2000
    });
  }

}

export interface DialogData {
  title?: string;
  message?: string;
  maxWidth?: string;
  confirmButtonTitle?: string;
  cancleButtonTitle?: string;
  icon?: string;
}