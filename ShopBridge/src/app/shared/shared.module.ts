import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './custom-material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

const MODULES = [
  CommonModule,
  CustomMaterialModule,
  FormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule { }
