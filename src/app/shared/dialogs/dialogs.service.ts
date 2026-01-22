import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialog } from './confirm-dialog';
import { MessageDialog } from "./message-dialog";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  private dialog = inject(MatDialog);

  public async confirm(title: string, message: string): Promise<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialog>;

    dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return firstValueFrom(dialogRef.afterClosed());
  }

  public async message(title: string, message: string): Promise<boolean> {

    let dialogRef: MatDialogRef<MessageDialog>;

    dialogRef = this.dialog.open(MessageDialog);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return firstValueFrom(dialogRef.afterClosed());
  }
}
