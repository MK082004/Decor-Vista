import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
// import { ConfirmationDialogComponent } from 'src/app/shared/featured/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  // notifiedStatusRequestDialog(title?: string, message?: string, maxWidth?: string, okButtonNametext?: string, cancleButtonNametext?: string, icon?: string): Observable<boolean> {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: maxWidth,
  //     data: {
  //       title: title,
  //       message: message,
  //       maxWidth: maxWidth,
  //       okButtonNametext: okButtonNametext,
  //       cancleButtonNametext: cancleButtonNametext,
  //       icon: icon,
  //     },
  //     autoFocus: false
  //   });

  //   return dialogRef.afterClosed();
  // }

  showNotification(message: string, isSuccess: boolean) {
    this.snackBar.open(message, '', {
      verticalPosition:  "bottom",
      horizontalPosition: "center",
      panelClass: isSuccess ? "snackbar-success" :  "snackbar-danger",
      duration : 4000
    });
  }

}
