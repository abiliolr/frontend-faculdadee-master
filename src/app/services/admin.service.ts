import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // --- Alunos & Professores ---
  getAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alunos`, httpOptions);
  }

  getProfessores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professores`, httpOptions);
  }

  createUser(user: any): Observable<any> {
    // Reusing the public register endpoint, or create a specific admin one if needed.
    // Ideally admin uses a protected endpoint to create users without auto-login,
    // but for simplicity we reuse /auth/register or we assume backend handles it.
    // server.js /register checks duplicate username.
    return this.http.post(`${this.apiUrl}/auth/register`, user, httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, httpOptions);
  }

  // --- Disciplinas ---
  getDisciplinas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplinas`, httpOptions);
  }

  createDisciplina(disciplina: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/disciplinas`, disciplina, httpOptions);
  }

  deleteDisciplina(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/disciplinas/${id}`, httpOptions);
  }
}
