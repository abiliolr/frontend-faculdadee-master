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
export class ProfessorService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDisciplinas(professorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professores/${professorId}/disciplinas`, httpOptions);
  }

  listarAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alunos`, httpOptions);
  }

  // Updated to support new payload structure if strictly typed, but 'any' covers it.
  lancarNota(notaData: { studentId: number; subjectId: number; nota1?: number | null; nota2?: number | null }): Observable<any> {
    return this.http.post(`${this.apiUrl}/notas`, notaData, httpOptions);
  }

  agendarProva(provaData: { subjectId: number; name: string; date: string; time: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/provas`, provaData, httpOptions);
  }

  deleteProva(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/provas/${id}`, httpOptions);
  }
}
