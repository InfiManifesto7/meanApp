import { Component, OnInit, inject } from '@angular/core'; 
import { ProductService } from '../../services/product.service';
//import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true, 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'], // ✅ Corrected from styleUrl to styleUrls
  imports: [
    CommonModule,
    //MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatGridListModule
  ]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  // Injecting services using Angular's `inject()` function
  private productService = inject(ProductService);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;

        // Registering a custom SVG icon
        this.matIconRegistry.addSvgIcon(
          'my-custom-icon',
          this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/my-custom-icon.svg')
        );
      },
      error: (error) => {
        console.error('Failed to fetch products', error);
      }
    });
  }
}

