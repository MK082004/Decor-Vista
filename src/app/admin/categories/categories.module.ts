import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AddEditCategoryComponent } from './dialog/add-edit-category/add-edit-category.component';
import { ImageDialogComponent } from './dialog/image-dialog/image-dialog.component';
import { CommonHelper } from 'src/app/core/helpers/common.helper';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesLogComponent } from './logs/categories-log/categories-log.component';
@NgModule({
  declarations: [
    AddEditCategoryComponent,
    ImageDialogComponent,
    CategoriesLogComponent
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
