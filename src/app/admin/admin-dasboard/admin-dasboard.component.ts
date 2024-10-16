import { CategoriesService } from 'src/app/admin/categories/categories.service';
import { ProductService } from './../products/product.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {
  orders: number = 120;
  revenue: number = 25000;
  productCount: number = 0;
  categoriesCount: number = 0;

  // Mock user data
  // users: UserModel[] = [
  //   { name: 'John Doe', userRole: 'Admin', userEmail: 'john@example.com' },
  //   { name: 'Jane Smith', userRole: 'User', userEmail: 'jane@example.com' },
  //   { name: 'Mike Johnson', userRole: 'Editor', userEmail: 'mike@example.com' }
  // ];

  // Columns displayed in the table
  displayedColumns: string[] = ['serialNo', 'name', 'userRole', 'email'];

  // Data source for the table
  // dataSource = new MatTableDataSource<UserModel>(this.users);

  constructor(private productService: ProductService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.fetchCounts();  // Call this to fetch product and category counts
  }

  fetchCounts() {
    this.productService.products$.subscribe((res) => {
      if (res) {
        this.productCount = res.count;
      }
    });

    // this.categoriesService.getCategories().subscribe((res) => {
    //   if (res) {
    //     this.categoriesCount = res.count;
    //   }
    // });
  }
}
