import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/admin/categories/categories.service';
import { Product } from 'src/app/core/models/product.model';
import { Category } from 'src/app/core/models/product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-addEdit-product',
  templateUrl: './addEdit-product.component.html',
  styleUrls: ['./addEdit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  selectedFile: File | null = null;

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
      imageUrl: [ data ? data.imageUrl : '', Validators.required ]
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoriesService.getCategories();
    this.categoriesService.categories$.subscribe(
      (categories) => {
        this.categories = categories.categories;
      },
      (error) => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }

  handleFileInputChange(fileList: FileList): void {
    // this.file_store = fileList;
    if (fileList.length) {
      const fileNames = Array.from(fileList).map(file => file.name).join(', ');
      this.productForm.controls['imageUrl'].setValue(fileNames);
    } else {
      this.productForm.controls['imageUrl'].setValue('');
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      const productData = this.productForm.getRawValue();

      // Append product details to FormData
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
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
      this.productService.addEditProduct(formData).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
