import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-atribuir-nota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atribuir-nota.html',
  styleUrls: ['./atribuir-nota.css']
})
export class AtribuirNotaComponent implements OnInit {
  disciplinas: any[] = [];
  alunos: any[] = [];

  form: any = {
    aluno: '',
    disciplina: '',
    nota1: null,
    nota2: null
    aluno: '', // This will hold the ID now
    disciplina: '', // This will hold the ID now
    nota: null
  };

  successMessage = '';
  errorMessage = '';

  professorId: number | null = null;
  // TODO: Get real professor ID from Auth
  professorId = 2;

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
        const userInfoStr = localStorage.getItem('user_info');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            this.professorId = userInfo.id;
        }
    }

    this.carregarDados();
  }

  carregarDados(): void {
    if (this.professorId) {
        this.professorService.getDisciplinas(this.professorId).subscribe({
        next: (data: any[]) => this.disciplinas = data,
        error: (err: any) => console.error('Erro ao carregar disciplinas', err)
        });
    }
    this.professorService.getDisciplinas(this.professorId).subscribe({
      next: (data: any[]) => this.disciplinas = data,
      error: (err: any) => console.error('Erro ao carregar disciplinas', err)
    });

    this.professorService.listarAlunos().subscribe({
      next: (data: any[]) => this.alunos = data,
      error: (err: any) => console.error('Erro ao carregar alunos', err)
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Validate grades
    if (this.form.nota1 !== null && (this.form.nota1 < 0 || this.form.nota1 > 10)) {
        this.errorMessage = 'A Nota 1 deve estar entre 0 e 10.';
        return;
    }
    if (this.form.nota2 !== null && (this.form.nota2 < 0 || this.form.nota2 > 10)) {
        this.errorMessage = 'A Nota 2 deve estar entre 0 e 10.';
        return;
    }

    const payload = {
      studentId: parseInt(this.form.aluno),
      subjectId: parseInt(this.form.disciplina),
      nota1: this.form.nota1,
      nota2: this.form.nota2
      value: this.form.nota
    };

    this.professorService.lancarNota(payload).subscribe({
      next: (res: any) => {
        const alunoNome = this.alunos.find(a => a.id === payload.studentId)?.name;
        const discNome = this.disciplinas.find(d => d.id === payload.subjectId)?.name;

        alert(`Notas atualizadas para ${alunoNome} na disciplina ${discNome}!`);
        this.successMessage = 'Notas lançadas com sucesso!';
        this.form = { aluno: '', disciplina: '', nota1: null, nota2: null };
        alert(`Nota ${this.form.nota} atribuída ao aluno(a) ${alunoNome} na disciplina ${discNome}!`);
        this.successMessage = 'Nota lançada com sucesso!';
        this.form = { aluno: '', disciplina: '', nota: null };
      },
      error: (err: any) => {
        console.error('Erro ao lançar nota', err);
        this.errorMessage = 'Erro ao salvar a nota. Tente novamente.';
      }
    });
  }
}
