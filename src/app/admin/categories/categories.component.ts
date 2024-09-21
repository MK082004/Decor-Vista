import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/core/models/product.model';
import { CategoriesService } from './categories.service';
import { AddEditCategoryComponent } from './dialog/add-edit-category/add-edit-category.component';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>([]);
  displayedColumns: string[] = ['id', 'name', 'displayOrder', 'actions'];
  length: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoriesService: CategoriesService,
    private MatDialog: MatDialog,
    private notificationService: DialogService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getCategories();
    this.categoriesService.categories$.subscribe((res) => {
      if (res) {
        console.log(res);

        this.categories = res.categories;
        this.length = res.count;
        this.dataSource.data = this.categories;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCategory(): void {
    const dialogRef = this.MatDialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: new Category(),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadCategories();
        this.notificationService.showNotification(
          res.message,
          res.isSuccessfull
        );
      } else {
        this.notificationService.showNotification(
          res.message,
          res.isSuccessfull
        );
      }
    });
  }

  editCategory(category: Category): void {
    const dialogRef = this.MatDialog.open(AddEditCategoryComponent, {
      width: '50em',
      data: category
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadCategories();
        this.notificationService.showNotification(
          res.message,
          res.isSuccessfull
        );
      } else {
        this.notificationService.showNotification(
          res.message,
          res.isSuccessfull
        );
      }
    });
  }

  deleteCategory(category: Category): void {
    this.notificationService
      .notifiedStatusRequestDialog(
        'Delete Product',
        `Are you sure you want to Delete? this category ${category.name}`,
        '550px',
        'Ok',
        'Cancel',
        'delete'
      )
      .subscribe((res) => {
        if (res) {
          this.categoriesService
            .deleteCategory(category.id)
            .subscribe((res) => {
              if (res) {
                console.log(res);

                this.loadCategories();
                this.notificationService.showNotification(
                  res.message,
                  res.isSuccessfull
                );
              } else {
                this.notificationService.showNotification(
                  res.message,
                  res.isSuccessfull
                );
              }
            });
        }
      });
  }
}
