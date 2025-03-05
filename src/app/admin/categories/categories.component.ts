import { DynamicTableComponent } from './../../shared/dynamic-components/Grids/basic-level/dynamic-table/dynamic-table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  CategorgyAddEditCompModel,
  CategoryAddEditDeleteModel,
  CategoryModel,
} from 'src/app/core/models/category.model';
import {
  DialogData,
  DialogService,
} from 'src/app/core/services/dialog/dialog.service';
import { CategoriesService } from './categories.service';
import { AddEditCategoryComponent } from './dialog/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { FieldType } from 'src/app/core/enums/auto-table-data-source.enum';
import { ImageDialogComponent } from './dialog/image-dialog/image-dialog.component';
import { UserService } from 'src/app/core/services/user/user.service';
import {
  DynamicTableColumnDefinition,
  DynamicTableColumnTypes,
} from 'src/app/shared/dynamic-components/Grids/basic-level/dynamic-table/dynamic-table.component';
import { FieldInterface } from 'src/app/core/interfaces/auto-table-data-source.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryFilterForm: FormGroup;
  isfilterCategoriesHandler: boolean = false;
  categorySearch: FormControl = new FormControl('');
  columns: DynamicTableColumnDefinition[] = [];
  filterOptions: FieldInterface[] = [];
  @ViewChild(DynamicTableComponent)
  dynamicTableComponent: DynamicTableComponent;
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private notificationService: DialogService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initializedColumns();
    this.loadCategoriesTableDataSource();
  }

  private initForm(): void {
    this.categoryFilterForm = this.fb.group({
      categorySearchString: [''],
      categoryStatus: [''],
      categoryStartDate: [''],
      categoryEndDate: [''],
    });
  }

  private initializedColumns() {
    this.columns = [
      {
        columnKey: 'sNo',
        columnLabel: 'S.No',
        columnType: DynamicTableColumnTypes.NUMBER,
        columnClass:
          'border-end ps-0 me-3 d-flex justify-content-center mat-table-column-width-5',
        columnHeaderClass: 'ps-4',
        showActionButtons: false,
      },
      {
        columnKey: 'categoryName',
        columnLabel: 'Category Name',
        columnType: DynamicTableColumnTypes.STRING,
        columnClass: 'mat-table-column-width-15',
        showActionButtons: false,
      },
      {
        columnKey: 'categoryDescription',
        columnLabel: 'Category Description',
        columnType: DynamicTableColumnTypes.STRING,
        columnClass: 'mat-table-column-width-20',
        showActionButtons: false,
      },
      {
        columnKey: 'categoryImage',
        columnLabel: 'Category Image',
        columnType: DynamicTableColumnTypes.IMAGE,
        columnClass: 'mat-table-column-width-15',
        showActionButtons: false,
      },
      {
        columnKey: 'isActive',
        columnLabel: 'Is Active',
        columnType: DynamicTableColumnTypes.BOOLEAN,
        columnClass: 'mat-table-column-width-10',
        showActionButtons: false,
      },
      {
        columnKey: 'sortOrder',
        columnLabel: 'Sort Order',
        columnType: DynamicTableColumnTypes.NUMBER,
        columnClass: 'mat-table-column-width-10',
        showActionButtons: false,
      },
      {
        columnKey: 'createdDate',
        columnLabel: 'Created Date',
        columnType: DynamicTableColumnTypes.DATE,
        columnClass: 'mat-table-column-width-10',
        showActionButtons: false,
      },
      {
        columnKey: 'actions',
        columnLabel: 'Actions',
        columnType: DynamicTableColumnTypes.ACTIONS,
        columnClass: 'mat-table-column-width-10',
        showActionButtons: true,
        buttons: ['edit', 'delete'],
      },
    ];
  }

  private loadCategoriesTableDataSource() {
    const formValues = this.categoryFilterForm.getRawValue();
    if (formValues) {
      this.filterOptions = [
        {
          fieldName: 'categorySearchString',
          fieldType: FieldType.STRING,
          fieldValue: this.categorySearch.value || null,
        },
        {
          fieldName: 'categoryStatus',
          fieldType: FieldType.BOOLEAN,
          fieldValue: formValues.categoryStatus || null,
        },
        {
          fieldName: 'categoryStartDate',
          fieldType: FieldType.DATE,
          fieldValue: formValues.categoryStartDate || null,
        },
        {
          fieldName: 'categoryEndDate',
          fieldType: FieldType.DATE,
          fieldValue: formValues.categoryEndDate || null,
        },
      ];
    }
  }

  isShowfilterCategory() {
    this.isfilterCategoriesHandler = !this.isfilterCategoriesHandler;
  }

  onFilterChange() {
    let isValidDateRange = true;
    Object.keys(this.categoryFilterForm.controls).forEach((controlName) => {
      if (controlName === 'categoryStartDate' ||controlName === 'categoryEndDate') {
        const startDate = this.categoryFilterForm.controls['categoryStartDate'];
        const endDate = this.categoryFilterForm.controls['categoryEndDate'];
        if (startDate.value && endDate.value) {
          const startDateValue = new Date(startDate.value);
          const endDateValue = new Date(endDate.value);
          if (startDateValue >= endDateValue) {
            startDate.setErrors({ invalidDateRange: true });
            isValidDateRange = false;
          } else {
            startDate.setErrors(null);
          }
        }
      }
    });

    if (isValidDateRange) {
      this.loadCategoriesTableDataSource();
    }
  }

  refreshCategoryPage() {
    this.categoryFilterForm.reset();
    this.loadCategoriesTableDataSource();
  }

  openImageDialog(category: CategoryModel) {
    this.dialog.open(ImageDialogComponent, {
      data: {
        categoryName: category.categoryName,
        categoryImage: category.categoryImage,
      },
      width: '50dvw',
      height: '75dvh',
      panelClass: 'custom-dialog-container',
    });
  }

  onRowDoubleClick(columnClicked: string, category: CategoryModel) {
    const model: CategorgyAddEditCompModel = {
      category: category,
      focusField: columnClicked,
    };

    this.dialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: model,
    });
  }

  addCategory(): void {
    this.router.navigate(['/admin/categories/add-category']);
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: new CategorgyAddEditCompModel(),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.isSuccessful) {
          this.loadCategoriesTableDataSource();
        }
        this.notificationService.showMessage(res.message, res.isSuccessful);
      }
      this.router.navigate(['/admin/categories']);
    });
  }

  handleEdit(row: CategoryModel): void {
    this.router.navigate(['/admin/categories/edit-category']);
    const model: CategorgyAddEditCompModel = {
      category: row,
      focusField: null,
    };
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: model,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.isSuccessful) {
          this.loadCategoriesTableDataSource();
        }
        this.notificationService.showMessage(res.message, res.isSuccessful);
      }
      this.router.navigate(['/admin/categories']);
    });
  }

  handleDelete(row: CategoryAddEditDeleteModel): void {
    let model: DialogData = {
      title: 'Delete Product',
      message: `Are you sure you want to Delete? this category ${row.categoryName}`,
      maxWidth: '550px',
      confirmButtonTitle: 'Ok',
      cancleButtonTitle: 'Cancel',
      icon: 'delete',
    };
    this.notificationService
      .notifiedStatusRequestDialog(model)
      .subscribe((res) => {
        if (res) {
          this.categoriesService
            .deleteCategory(row.categoryId)
            .subscribe((res) => {
              if (res) {
                this.loadCategoriesTableDataSource();
              }
              this.notificationService.showMessage(
                res.message,
                res.isSuccessful
              );
            });
        }
      });
  }

  handleActive(row: CategoryAddEditDeleteModel): void {
    let model: DialogData = {
      title: 'Change Category Status',
      message: `Are you sure you want to Change Activation Status ? this category ${row.categoryName}`,
      maxWidth: '550px',
      confirmButtonTitle: row.isActive ? 'Un Active' : 'Active',
      cancleButtonTitle: 'Cancel',
      icon: row.isActive ? 'visibility_off' : 'visibility',
    };
    this.notificationService
      .notifiedStatusRequestDialog(model)
      .subscribe((res) => {
        if (res) {
          row.createdDate = new Date();
          row.modifiedBy = this.userService.currentUserName;
          row.modifiedDate = new Date();
          this.categoriesService.updateCategoryStatus(row).subscribe((res) => {
            if (res) {
              this.loadCategoriesTableDataSource();
            }
            this.notificationService.showMessage(res.message, res.isSuccessful);
          });
        }
      });
  }
}
