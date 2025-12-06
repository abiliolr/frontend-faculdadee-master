import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-frequencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './frequencia.html',
  styleUrls: ['./frequencia.css']
})
export class FrequenciaComponent implements OnInit {
  disciplinas: any[] = [];
  alunos: any[] = [];

  form: any = {
    disciplina: '',
    aluno: ''
  };

  currentAbsences: number | null = null;
  message = '';
  professorId: number | null = null;

  constructor(
    private professorService: ProfessorService,
    private alunoService: AlunoService // Reuse to fetch student current attendance if needed
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
        const userInfoStr = localStorage.getItem('user_info');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            this.professorId = userInfo.id;
        }
    }

    if (this.professorId) {
        this.loadDisciplinas();
        this.loadAlunos();
    }
  }

  loadDisciplinas(): void {
    if (this.professorId) {
        this.professorService.getDisciplinas(this.professorId).subscribe({
            next: (data) => this.disciplinas = data,
            error: (err) => console.error('Erro ao carregar disciplinas', err)
        });
    }
  }

  loadAlunos(): void {
      this.professorService.listarAlunos().subscribe({
          next: (data) => this.alunos = data,
          error: (err) => console.error('Erro ao carregar alunos', err)
      });
  }

  // When selection changes, try to fetch current attendance
  onSelectionChange(): void {
      this.message = '';
      this.currentAbsences = null;

      if (this.form.disciplina && this.form.aluno) {
          // Fetch current attendance for this pair.
          // Reuse AlunoService.getFrequencia logic?
          // getFrequencia returns *all* subjects for a student.
          // Efficient enough for now.
          this.alunoService.getFrequencia(parseInt(this.form.aluno)).subscribe({
              next: (data) => {
                  const subjectId = parseInt(this.form.disciplina);
                  const record = data.find(r => r.subjectId === subjectId);
                  if (record) {
                      this.currentAbsences = record.absences;
                  } else {
                      this.currentAbsences = 0;
                  }
              },
              error: (err) => console.error('Erro ao buscar frequência atual', err)
          });
      }
  }

  incrementarFrequencia(): void {
      if (!this.form.disciplina || !this.form.aluno) {
          alert('Selecione disciplina e aluno.');
          return;
      }

      const payload = {
          studentId: parseInt(this.form.aluno),
          subjectId: parseInt(this.form.disciplina),
          action: 'increment'
      };

      this.professorService.registrarFrequencia(payload).subscribe({
          next: (res) => {
              this.message = 'Falta registrada com sucesso!';
              this.currentAbsences = res.absences;
          },
          error: (err) => {
              console.error(err);
              this.message = 'Erro ao registrar falta.';
          }
      });
  }
}
