import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      {
        username: credentials.username,
        password: credentials.password
      },
      httpOptions
    ).pipe(
      tap((response: any) => {
        if (response.token && typeof localStorage !== 'undefined') {
          localStorage.setItem('auth_token', response.token);
          // Also store user info if needed
          if (response.user) {
            localStorage.setItem('user_info', JSON.stringify(response.user));
          }
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      user,
      httpOptions
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
    }
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }
}
