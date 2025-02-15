
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  private authService = inject(AuthService); 
  private router = inject(Router); 

  onSubmit(): void {
    this.authService.signup(this.username, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => console.error('Signup failed', error)
    });
  }
}
