import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatTableModule
    ]
})
export class AdminAddProductComponent  {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);

  product = {
    productId: '',
    description: '',
    price: 0,
    quantity: 1,
    image: ''
  };
  displayedColumns: string[] = ['id', 'description', 'price', 'quantity', 'image', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  products: any[] = []; 
  
  

  constructor() {
    this.loadProducts();
  
const user = this.authService.getDecodedToken();
    if (user?.role !== 'admin') {
      alert('Unauthorized access!');
      this.router.navigate(['/home']);
    }
  }
  
  onSubmit(): void {
    this.productService.addProduct(this.product).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        alert('Product added successfully!');
        this.loadProducts(); 
        this.resetForm();
      },
      error: (error) => {
        console.error('Failed to add product', error);
        alert('Error adding product. Please try again later');
      }
    });
  }


  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Fetched products:', data);
        this.products = data; 
        this.dataSource.data =data;
      },
      error: (error) => {
        console.error('Failed to fetch products', error);
        alert('Error fetching products. Please try again later.');
      }
    });
  }

  
  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        alert('Product deleted successfully!');
        this.loadProducts(); 
      },
      error: (error) => {
        console.error('Failed to delete product', error);
        alert('Error deleting product. Please try again later.');
      }
    });
  }

  
  resetForm(): void {
    this.product = {
      productId: '',
      description: '',
      price: 0,
      quantity: 1,
      image: ''
    };
  }
}
