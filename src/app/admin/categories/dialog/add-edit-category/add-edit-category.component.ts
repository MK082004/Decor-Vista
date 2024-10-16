import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '../../categories.service';
import { CategoryModel } from 'src/app/core/models/category.model';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode: boolean;
  @ViewChild('ngCategoryForm') ngCategoryForm: NgForm;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private notificationService: DialogService,
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.categoryId;
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryId: [this.data?.categoryId || 0],
      categoryName: [this.data?.categoryName, [Validators.required]],
      categoryDescription: [
        this.data?.categoryDescription,
        [Validators.required],
      ],
      categoryImage: [this.data?.categoryImage, [Validators.required]],
      sortOrder: [
        this.data?.sortOrder,
        [Validators.required, Validators.min(1)],
      ],
    });

    // Focus the relevant field based on the clicked column
    switch (this.data.columnClicked) {
      case 'categoryName':
        document.getElementById('categoryNameField')?.focus();
        break;
      case 'categoryDescription':
        document.getElementById('categoryDescriptionField')?.focus();
        break;
      case 'sortOrder':
        document.getElementById('sortOrderField')?.focus();
        break;
      case 'categoryImage':
        document.getElementById('categoryImageField')?.focus();
        break;
      default:
        break;
    }
  }

  GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    const element = document.getElementById(
      'fakeFileInput'
    ) as HTMLInputElement | null;
    if (element != null && file) {
      element.value = file.name;
      this.categoryForm.patchValue({ categoryImage: file });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData: CategoryModel = this.categoryForm.getRawValue();
      const formData = new FormData();
      formData.append('categoryId', categoryData.categoryId.toString());
      formData.append('categoryName', categoryData.categoryName);
      formData.append('categoryDescription', categoryData.categoryDescription);
      formData.append('sortOrder', categoryData.sortOrder.toString());
      if (categoryData.categoryImage) {
        formData.append('categoryImage', categoryData.categoryImage);
      }
      if (this.isEditMode) {
        this.categoriesService.updateCategory(formData).subscribe((res) => {
          this.dialogRef.close(res);
        });
      } else {
        this.categoriesService.addCategory(formData).subscribe((res) => {
          this.dialogRef.close(res);
        });
      }
      this.resetForm();
    } else {
      this.notificationService.showMessage(
        'Please fill in all required fields.',
        false
      );
    }
  }

  resetForm() {
    this.categoryForm.reset();
    this.ngCategoryForm.resetForm();
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
