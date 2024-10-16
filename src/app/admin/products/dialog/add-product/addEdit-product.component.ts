import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/admin/categories/categories.service';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from '../../product.service';
import { CategoryModel } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-addEdit-product',
  templateUrl: './addEdit-product.component.html',
  styleUrls: ['./addEdit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  productForm: FormGroup;
  categories: CategoryModel[] = [];
  images: File[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) {
    this.productForm = this.fb.group({
      id: [data ? data.id : null],
      title: [data ? data.title : '', Validators.required],
      description: [data ? data.description : '', Validators.required],
      sku: [data ? data.sku : '', Validators.required],
      author: [data ? data.author : '', Validators.required],
      listPrice: [
        data ? data.listPrice : null,
        [Validators.required, Validators.min(0)],
      ],
      price: [
        data ? data.price : null,
        [Validators.required, Validators.min(0)],
      ],
      price50: [
        data ? data.price50 : null,
        [Validators.required, Validators.min(0)],
      ],
      price100: [
        data ? data.price100 : null,
        [Validators.required, Validators.min(0)],
      ],
      categoryId: [data ? data.categoryId : null, Validators.required],
      imageUrl: [data ? data.imageUrl : '', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.fetchCategories();
  }

  // fetchCategories(): void {
  //   this.categoriesService.getCategories().subscribe(
  //     (response) => {
  //       this.categories = response?.categories;
  //     },
  //     (error) => {
  //       console.error('Failed to fetch categories:', error);
  //     }
  //   );
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.images = Array.from(input.files);
      const imageNames = this.images.map((file) => file.name).join(', ');
      this.productForm.patchValue({ imageUrl: imageNames });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      const productData = this.productForm.getRawValue();
      formData.append('id', productData.id ? productData.id.toString() : null);
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('sku', productData.sku);
      formData.append('author', productData.author);
      formData.append('listPrice', productData.listPrice.toString());
      formData.append('price', productData.price.toString());
      formData.append('price50', productData.price50.toString());
      formData.append('price100', productData.price100.toString());
      formData.append('categoryId', productData.categoryId.toString());
      // const imageNamesArray = this.images
      // .map((file) => file.name ? file : null)
      // .filter(Boolean);
      // imageNamesArray.forEach((file) => {
      //   formData.append('imageUrl', file, file.name);
      // });
      this.productService.addEditProduct(formData).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }

  onFileInputClick(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
