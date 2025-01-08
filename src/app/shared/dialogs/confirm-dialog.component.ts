import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <h3 mat-dialog-title>{{ title }}</h3>
        <p mat-dialog-content> {{ message }} </p>
        <mat-divider></mat-divider>
        <div mat-dialog-actions>
            <button type="button" mat-raised-button (click)="dialogRef.close(true)">OK</button>
            <button type="button" mat-button (click)="dialogRef.close(false)">Cancel</button>
        </div>
    `,
    imports: [
        MatDialogModule,
        MatDividerModule,
        MatButtonModule,
    ]
})
export class ConfirmDialogComponent {
    dialogRef = inject<MatDialogRef<ConfirmDialogComponent>>(MatDialogRef);

    public title = '';
    public message = '';
}
