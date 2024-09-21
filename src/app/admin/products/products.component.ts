import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from './product.service';
import { MatPaginator } from '@angular/material/paginator';
import { AddEditProductComponent } from './dialog/add-product/addEdit-product.component';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { ApiResponseModel } from 'src/app/core/models/apiResponse.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'sku',
    'author',
    'listPrice',
    'price',
    'price50',
    'price100',
    'category',
    'imageUrl',
    'actions'
  ];

  length: number;
  products: Product[] = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private MatDialog: MatDialog,
    private notificationService: DialogService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts();
    this.productService.products$.subscribe((res) => {
      if (res) {
        this.products = res.products;
        this.length = res.count;
        this.dataSource.data = this.products;
      }
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProduct() {
    const dialogRef = this.MatDialog.open(AddEditProductComponent, {
      width: '50em',
      data: new Product()
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadProducts();
        this.notificationService.showNotification(res.message, res.isSuccessfull);
      }
      else {
        this.notificationService.showNotification(res.message, res.isSuccessfull);
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.MatDialog.open(AddEditProductComponent, {
      width: '50em',
      data: product
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadProducts();
        this.notificationService.showNotification(res.message, res.isSuccessfull);
      }
      else {
        this.notificationService.showNotification(res.message, res.isSuccessfull);
      }
    });
  }

  deleteProduct(product: Product) {
    this.notificationService.notifiedStatusRequestDialog('Delete Product', `Are you sure you want to Delete? this product ${product.title}`, '550px', 'Ok', 'Cancel', 'delete').subscribe((res) => {
      if (res) {
        this.productService.deleteProduct(product.id).subscribe(res => {
          if (res) {
            this.loadProducts();
            this.notificationService.showNotification(res.message, res.isSuccessfull);
          } else {
            this.notificationService.showNotification(res.message, res.isSuccessfull);
          }
        });
      }
    });
  }
}
