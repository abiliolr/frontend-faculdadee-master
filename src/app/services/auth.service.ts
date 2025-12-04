import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// MUDANÇA 1: Adicionar o httpOptions com 'withCredentials'
/**
 * HTTP options for requests.
 *
 * Includes headers for JSON content type and ensures credentials (cookies) are sent with the request.
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true // ESSENCIAL para enviar o cookie de sessão
};

/**
 * Service for handling authentication-related operations.
 *
 * @remarks
 * This service provides methods for logging in and registering users via the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * The base URL for the authentication API.
   */
  private apiUrl = 'http://localhost:8080/api/auth';

  /**
   * Creates an instance of AuthService.
   *
   * @param {HttpClient} http - The Angular HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Authenticates a user with the provided credentials.
   *
   * @param {any} credentials - The user credentials containing `username` and `password`.
   * @returns {Observable<any>} An observable that resolves with the login response (e.g., user data or token).
   */
  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      {
        username: credentials.username,
        password: credentials.password
      },
      httpOptions // MUDANÇA 2: Passar as opções aqui
    );
  }

  /**
   * Registers a new user.
   *
   * @param {any} user - The user object containing registration details.
   * @returns {Observable<any>} An observable that resolves with the registration response.
   */
  register(user: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      user,
      httpOptions // MUDANÇA 3: Passar as opções aqui também
    );
  }
}
