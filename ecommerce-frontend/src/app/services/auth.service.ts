

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode, JwtPayload } from 'jwt-decode'; // Import type

interface LoginResponse {
  token: string;
  role: string;
}

interface SignupResponse {
  message: string;
}

interface DecodedToken extends JwtPayload { 
  role?: string; 
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'authToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setAuthData(response.token, response.role); // Use helper function
        this.navigateAfterLogin(); // Use helper function
      }),
      catchError(this.handleError('Invalid credentials or server issue')) // Use helper function
    );
  }

  signup(username: string, email: string, password: string): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, { username, email, password }).pipe(
      catchError(this.handleError('Signup error. Please try again later.')) // Use helper function
    );
  }

  logout(): void {
    this.clearAuthData(); // Use helper function
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Use helper function
  }

  isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    return !!decodedToken?.role && decodedToken.role === 'admin'; 
  }

  getDecodedToken(): DecodedToken | null { 
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token); 
        return decoded;
      } catch (error) {
        console.error('Invalid token:', error);
        this.clearAuthData(); 
        return null;
      }
    }
    return null;
  }

  private getToken(): string | null { 
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  private setAuthData(token: string, role: string): void { 
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem('role', role);
    }
  }

  private clearAuthData(): void { 
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('role');
    }
  }

  private navigateAfterLogin(): void {
    const user = this.getDecodedToken();
    if (user?.role === 'admin') {
      this.router.navigate(['/admin-add-product']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  private handleError(errorMessage: string) { 
    return (error: any) => {
      console.error(errorMessage, error); 
      return throwError(() => new Error(errorMessage)); 
    };
  }
}