import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AddEditCategoryComponent } from './dialog/add-edit-category/add-edit-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageDialogComponent } from './dialog/image-dialog/image-dialog.component';
import { CommonHelper } from 'src/app/core/helpers/common.helper';

@NgModule({
  declarations: [
    AddEditCategoryComponent,
    ImageDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule
  ],
  providers: [
    CommonHelper
  ]
})
export class CategoriesModule { }
