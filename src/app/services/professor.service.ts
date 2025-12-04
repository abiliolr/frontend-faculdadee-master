import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8080/api/professor';

  constructor(private http: HttpClient) {}

  /**
   * Obtém a lista de disciplinas do professor logado.
   * Por enquanto, retorna um mock se o endpoint não existir, ou chama o backend.
   * Vamos assumir que existe um endpoint GET /disciplinas
   */
  getDisciplinas(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.apiUrl}/disciplinas`, httpOptions);

    // Fallback Mock para desenvolvimento enquanto backend não está 100%
    return of([
      { id: 1, nome: 'Web II' },
      { id: 2, nome: 'Banco de Dados' },
      { id: 3, nome: 'Engenharia de Software' },
      { id: 4, nome: 'Algoritmos' }
    ]);
  }

  /**
   * Obtém os alunos matriculados em uma disciplina.
   * GET /disciplinas/{id}/alunos
   */
  getAlunosPorDisciplina(disciplinaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplinas/${disciplinaId}/alunos`, httpOptions);
  }

  /**
   * Cria uma nova prova.
   * POST /provas
   */
  criarProva(prova: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/provas`, prova, httpOptions);
  }

  /**
   * Lista as provas de uma disciplina.
   * GET /provas?disciplinaId={id}
   */
  getProvas(disciplinaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/provas?disciplinaId=${disciplinaId}`, httpOptions);
  }

  /**
   * Lança nota para um aluno.
   * POST /notas
   */
  lancarNota(notaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notas`, notaData, httpOptions);
  }

  /**
   * Salva a frequência (lista de presenças).
   * POST /frequencia
   */
  salvarFrequencia(frequenciaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/frequencia`, frequenciaData, httpOptions);
  }
}
