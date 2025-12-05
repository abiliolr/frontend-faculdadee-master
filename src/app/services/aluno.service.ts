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
export class AlunoService {

  private apiUrl = environment.apiUrl;
  private apiUrl = `${environment.apiUrl}/alunos`;

  constructor(private http: HttpClient) { }

  getBoletim(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alunos/${studentId}/boletim`, httpOptions);
  }

  getFrequencia(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alunos/${studentId}/frequencia`, httpOptions);
  }

  getProvas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/provas`, httpOptions);
    return this.http.get<any[]>(`${this.apiUrl}/${studentId}/boletim`, httpOptions);
  }

  getFrequencia(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${studentId}/frequencia`, httpOptions);
  }
}
