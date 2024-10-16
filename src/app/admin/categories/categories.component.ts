import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { CategoryModel } from "src/app/core/models/category.model";
import { DialogService } from "src/app/core/services/dialog/dialog.service";
import { CategoriesService } from "./categories.service";
import { AddEditCategoryComponent } from "./dialog/add-edit-category/add-edit-category.component";
import { MatDialog } from "@angular/material/dialog";
import { APIType, FieldType } from "src/app/core/enums/auto-table-data-source.enum";
import { TableDataModel } from "src/app/core/models/auto-table-data-source.model";
import { ApiService } from "src/app/core/services/api/api.service";
import { ImageDialogComponent } from "./dialog/image-dialog/image-dialog.component";
import { TableDataSource } from "src/app/core/controls/auto-dataSource/table-data-source";
import { fromEvent } from "rxjs";
import { CommonHelper } from "src/app/core/helpers/common.helper";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryFilterForm: FormGroup;
  categorySearch : FormControl = new FormControl('');
  categoriesColumns: string[] = ['Sno', 'categoryName', 'categoryDescription', 'categoryImage', 'sortOrder', 'actions'];
  categoriesTableDataSource: TableDataSource | null;
  categoriesTableDataModel = <TableDataModel>{};
  @ViewChild(MatPaginator, { static: true }) categoriesPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) categoriesSort: MatSort;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private notificationService: DialogService,
    private router: Router,
    private apiService: ApiService,
    private commonHelper: CommonHelper
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategoriesTableDataSource();
  }

  loadCategoriesTableDataSource() {
    this.categoriesTableDataModel.apiType = APIType.POST;
    this.categoriesTableDataModel.apiUrl = "Category/getCategories";
    this.categoriesTableDataModel.isApplySortingOnClient = true;
    this.categoriesTableDataModel.isApplyFilterOnClient = true;
    this.categoriesTableDataModel.paginator = this.categoriesPaginator;
    this.categoriesTableDataModel.sort = this.categoriesSort;
    const formValues = this.categoryFilterForm.value;
    this.categoriesTableDataModel.primaryFilterParams = [
      { fieldName: "categorySearchString", fieldType: FieldType.STRING, fieldValue: this.categorySearch.value || null },
      { fieldName: "categoryStatus", fieldType: FieldType.BOOLEAN, fieldValue: formValues.categoryStatus || null },
      { fieldName: "categoryStartDate", fieldType: FieldType.DATE, fieldValue: formValues.categoryStartDate || null },
      { fieldName: "categoryEndDate", fieldType: FieldType.DATE, fieldValue: formValues.categoryEndDate || null }
    ];
    this.categoriesTableDataSource = new TableDataSource(this.categoriesTableDataModel, this.commonHelper, this.apiService);
    this.categoriesTableDataSource.displayedColumns = this.categoriesColumns;
    this.categoriesTableDataModel.isLazyLoad = true;
  }

  onFilterSubmit() {
    this.loadCategoriesTableDataSource();
  }

  refreshCategoryPage() {
    this.categoryFilterForm.reset();
    this.loadCategoriesTableDataSource();
  }

  public pageCategoriesChange() {
    const skip = this.categoriesPaginator.pageSize * this.categoriesPaginator.pageIndex;
    this.categoriesTableDataSource.connect();
  }

  public onCategoriesSortChange(sortState: Sort) {
    this.categoriesTableDataSource.onSortingChange(sortState);
  }


  private initForm(): void {
    this.categoryFilterForm = this.fb.group({
      categorySearchString: [''],
      categoryStatus: [''],
      categoryStartDate: [''],
      categoryEndDate: ['']
    });
  }

  categorySelectionChanged() {

  }

  searchCategories() {
    if(this.categorySearch.value.length >= 3){
        this.loadCategoriesTableDataSource();
    }
  }

  openImageDialog(category: CategoryModel) {
    console.log(category);

    this.dialog.open(ImageDialogComponent, {
      data: {
        categoryName: category.categoryName,
        categoryImage: category.categoryImage
      },
      width: '50dvw',
      height: '75dvh',
      panelClass: 'custom-dialog-container'
    });
  }

  onRowDoubleClick(columnClicked: string, category: CategoryModel) {
    // Open the dialog and pass the field based on the column clicked
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: { ...category, focusField: columnClicked }
    });

    console.log(columnClicked);
  }

  addCategory(): void {
    // this.router.navigate(['/admin/categories/add-category']);
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: new CategoryModel(),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.isSuccessful) {
          this.loadCategoriesTableDataSource();
        }
        this.notificationService.showMessage(res.message, res.isSuccessfull);
      }
      this.router.navigate(['admin', 'categories']);
    });
  }

  editCategory(category: CategoryModel): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: category
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.isSuccessful) {
          this.loadCategoriesTableDataSource();
        }
        this.notificationService.showMessage(res.message, res.isSuccessfull);
      }
      this.router.navigate(['admin', 'categories']);
    });
  }

  deleteCategory(category: CategoryModel): void {
    this.notificationService.notifiedStatusRequestDialog(
        'Delete Product',
        `Are you sure you want to Delete? this category ${category.categoryName}`,
        '550px',
        'Ok',
        'Cancel',
        'delete'
      )
      .subscribe((res) => {
        if (res) {
          this.categoriesService
            .deleteCategory(category.categoryId)
            .subscribe((res) => {
              if (res) {
                console.log(res);

                this.loadCategoriesTableDataSource();
                this.notificationService.showMessage(
                  res.message,
                  res.isSuccessful
                );
              } else {
                this.notificationService.showMessage(
                  res.message,
                  res.isSuccessful
                );
              }
            });
        }
      });
  }
}
