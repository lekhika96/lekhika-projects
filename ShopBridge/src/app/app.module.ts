import { AddEditItemComponent } from './feature/add-edit-item/add-edit-item.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { ItemListComponent } from './feature/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { DeleteItemConfirmationDialogComponent } from './feature/delete-item-confirmation-dialog/delete-item-confirmation-dialog.component';

const COMPONENTS = [
  AddEditItemComponent,
  AppComponent,
  DashboardComponent,
  DeleteItemConfirmationDialogComponent,
  ItemListComponent,
];

const MODULES = [
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  SharedModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
