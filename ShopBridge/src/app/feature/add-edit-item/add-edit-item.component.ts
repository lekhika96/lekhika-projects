import { AddEditItemRequest } from '../constants/inventory-constants';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditItemComponent implements OnInit {

  public addEditItemReq: AddEditItemRequest = new AddEditItemRequest();
  public isUpdate: boolean = false;

  constructor(private dialogRef: MatDialogRef<AddEditItemComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
    this.isUpdate = this.dialogData.isUpdate;
    if (this.isUpdate) {
      this.addEditItemReq = this.dialogData.data;
    }
  }

  addEditItem() {
    if (this.addEditItemReq) {
      this.dialogRef.close(this.addEditItemReq);
    }
  }
}
