import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialogModule } from '@angular/material/legacy-dialog';
import { Component, inject } from '@angular/core';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-message-dialog',
    template: `
        <h3 mat-dialog-title>{{ title }}</h3>
        <p mat-dialog-content>{{ message }}</p>
        <mat-divider></mat-divider>
        <div mat-dialog-actions>
        <button type="button" mat-raised-button
            (click)="dialogRef.close(true)">OK</button>
        </div>
    `,
    standalone: true,
    imports: [
        MatLegacyDialogModule,
        MatDividerModule,
        MatLegacyButtonModule,
    ],
})

export class MessageDialogComponent {
      public dialogRef = inject<MatDialogRef<MessageDialogComponent>>(MatDialogRef<MessageDialogComponent>);
    public title: string;
    public message: string;
}

