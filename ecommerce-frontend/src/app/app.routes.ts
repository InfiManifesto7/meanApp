import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminAddProductComponent } from './components/admin-add-product/admin-add-product.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }, // Redirect to /products
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminAddProductComponent,
    canActivate: [() => {
      const authService = inject(AuthService);
      const user = authService.getDecodedToken();
      return user?.role === 'admin';
  }]
   },
  { path: '**', redirectTo: 'products' } // Catch-all redirect (better to redirect to your main page)
];