import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/product.model';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.isEditMode = !!data.id;
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [this.data?.id || null],
      name: [this.data?.name || '', [Validators.required]],
      displayOrder: [this.data?.displayOrder || 0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const productData = this.categoryForm.getRawValue();
      let model: Category = {
        id: this.data.id,
        name: productData.name,
        displayOrder: productData.displayOrder
      }
      this.categoriesService.addEditCategory(model).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
