import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DeleteItemConfirmationDialogComponent } from '../delete-item-confirmation-dialog/delete-item-confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from '../constants/inventory-constants';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit {

  public columns: string[] = ['model', 'name', 'specs', 'price', 'action'];
  public gridData = new MatTableDataSource<any>();
  public sortedData: any[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public pageSizeOptions = [5, 10, 20];

  constructor(private dialog: MatDialog,
              private http: HttpClient,
              private location: Location,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getItemList();
  }

  ngAfterViewInit() {
    this.setData();
  }

  public getItemList(): void {
    this.http.get<any>('https://api.npoint.io/968a7b840f0d8dc3458d').subscribe((response: InventoryItem[]) => {
      this.gridData.data = response;
      this.gridData.paginator = this.paginator;
      console.log(response);
    });
  }

  public onAddEditItem(item?: any): void {
    let modalData = {
      isUpdate: false,
      data: {}
    };
    if (item) {
      modalData = {
        isUpdate: true,
        data: item,
      }
    }
    this.dialog.open(AddEditItemComponent, {data: modalData, width: '550px'}).afterClosed().subscribe((result) => {
      if (result) {
        if (item) {
          let index = this.gridData.data.findIndex(data => data.model === item.model);
          if (index > -1) {
            this.gridData.data[index] = result;
          }
          this.setData();
          this.snackBar.open('Succefully updated.', '', { duration: 2500, horizontalPosition: 'end'});
        } else {
          let findIndex = this.gridData.data.findIndex(data => data.model === result.model);
          if (findIndex > -1) {
            this.snackBar.open('This product model is already added.','', { duration: 2500, horizontalPosition: 'end' });
          } else {
            this.gridData.data.push(result);
            this.setData();
            this.snackBar.open('Succefully added.', '', { duration: 2500, horizontalPosition: 'end' });
          }
        }
      }
    });
  }

  public onRemoveItem(item): void {
    this.dialog.open(DeleteItemConfirmationDialogComponent, {width: '400px'}).afterClosed().subscribe((response) => {
      if (response) {
        let findIndex = this.gridData.data.findIndex(data => data.model === item.model);
        if (findIndex > -1) {
          this.gridData.data.splice(findIndex, 1);
          this.snackBar.open('Succefully deleted.','', { duration: 2500, horizontalPosition: 'end'})
          this.setData();
        } else {
          this.snackBar.open('This product is already deleted.','', { duration: 2500, horizontalPosition: 'end'})
        }
      }
    });
  }

  public setData() {
    this.gridData.paginator = this.paginator;
  }

  public goBack() {
    this.location.back();
  }

  public onSortChange(sort: Sort) {
    console.log(sort);
    const data = this.gridData.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.gridData.data = this.sortedData;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      if (sort.active ) {
        return this.compare(a[sort.active], b[sort.active], isAsc);
      }
    });
    this.gridData.data = this.sortedData;
    this.setData();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gridData.filter = filterValue.trim().toLowerCase();
    this.setData();
  }

}
