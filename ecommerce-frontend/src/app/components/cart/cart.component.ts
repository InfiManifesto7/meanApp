
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatGridListModule
  ]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  private cartService = inject(CartService); 

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (response) => (this.cartItems = response),
      error: (error) => console.error('Failed to fetch cart items', error)
    });
  }

  addToCart(product: any): void {
    this.cartService
      .addToCart({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      })
      .subscribe({
        next: (response) => console.log('Added to cart:', response),
        error: (error) => console.error('Error adding to cart', error)
      });
  }

  deleteItem(id: string): void {
    this.cartService.deleteCartItem(id).subscribe({
      next: () => (this.cartItems = this.cartItems.filter(item => item._id !== id)),
      error: (error) => console.error('Failed to delete cart item', error)
    });
  }
}
