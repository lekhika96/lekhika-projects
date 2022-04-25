import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item-confirmation-dialog',
  templateUrl: './delete-item-confirmation-dialog.component.html',
  styleUrls: ['./delete-item-confirmation-dialog.component.scss']
})
export class DeleteItemConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteItemConfirmationDialogComponent>) {
  }

}

