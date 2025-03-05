import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '../../categories.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CategorgyAddEditCompModel, CategoryModel } from 'src/app/core/models/category.model';
@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css'],
})
export class AddEditCategoryComponent implements OnInit, AfterViewInit {
  categoryForm: FormGroup;
  isEditMode: boolean;
  currentUser: string;
  @ViewChild('ngCategoryForm') ngCategoryForm: NgForm;
  @ViewChild('hiddenInput') hiddenInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private categoriesService: CategoriesService,
    private notificationService: DialogService,
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategorgyAddEditCompModel
  ) {
    this.isEditMode = !!data.category?.categoryId;
  }

  ngOnInit(): void {
    this.fetchCurrentUserValues();
    this.createAddUpdatecategoryForm();
  }

  ngAfterViewInit(): void {
    if (this.data?.focusField) {
      const fieldName = this.data?.focusField as string;
      const element = document.getElementById(fieldName) as HTMLInputElement;
      switch (fieldName) {
        case 'categoryImageField':
          this.triggerFileInputClick();
          break;

        default:
          if (element) {
            element.setAttribute('cdkFocusInitial', '');
          }
          break;
      }
    }
  }

  triggerFileInputClick() {
    if (this.hiddenInput) {
      this.hiddenInput.nativeElement.click();
    }
  }

  fetchCurrentUserValues() {
    this.currentUser = this.userService.currentUserName;
  }

  createAddUpdatecategoryForm() {
    const categoryForm = this.fb.group({
      categoryId: [
        this.data.category?.categoryId || 0
      ],
      categoryName: [
        this.data.category?.categoryName,
        [Validators.required, Validators.maxLength(30)],
      ],
      categoryDescription: [
        this.data.category?.categoryDescription,
        [Validators.required, Validators.maxLength(225)],
      ],
      categoryImageHidden: [
        this.decodeBase64AndDownload(this.data.category?.categoryImage)
      ],
      categoryImage: [
        this.data.category?.categoryImage,
        [Validators.required, Validators.max(255)],
      ],
      sortOrder: [
        this.data.category?.sortOrder,
        [Validators.required, Validators.min(1), Validators.max(50)],
      ],
    });
    this.categoryForm = categoryForm;
  }

  GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    const element = document.getElementById('categoryImageField') as HTMLInputElement;
    if (element != null && file) {
      element.value = file.name;
      this.categoryForm.patchValue({ categoryImage: file });
    }
  }

  decodeBase64AndDownload(base64: string): string {
    if (base64) {
      const imageName = base64.split(',')[1].substring(1, 5);
      const mimeType = base64.split(';')[0].split(':')[1];
      const extension = mimeType.split('/')[1];
      return `${imageName+'.'+extension}`; 
    }
    return '';
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData: CategoryModel = this.categoryForm.getRawValue();
      const formData = new FormData();
      formData.append('categoryId', categoryData.categoryId.toString());
      formData.append('categoryName', categoryData.categoryName);
      formData.append('categoryDescription', categoryData.categoryDescription);
      formData.append('sortOrder', categoryData.sortOrder.toString());
      formData.append('modifiedBy', this.currentUser);
      if (categoryData.categoryImage) {
        formData.append('categoryImage', categoryData.categoryImage);
      }
      if (this.isEditMode) {
        const isCategoryEqual = (
          categoryData.categoryName === this.data.category.categoryName &&
          categoryData.categoryDescription === this.data.category.categoryDescription && 
          categoryData.sortOrder === this.data.category.sortOrder &&
          categoryData.categoryImage === this.data?.category?.categoryImage);        
        if (!isCategoryEqual) {
          this.categoriesService.updateCategory(formData).subscribe((res) => {
            this.dialogRef.close(res);
            this.resetForm();
          });
        }
        else {
          this.notificationService.showMessage('Please update at least one field.', false)
        }
      } else {
        formData.append('createdBy', this.currentUser);
        formData.append('isActive', 'true');
        this.categoriesService.addCategory(formData).subscribe((res) => {
          this.dialogRef.close(res);
          this.resetForm();
        });
      }
    } else {
      this.categoryForm.markAllAsTouched();
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