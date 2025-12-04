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
    alunoId: '',
    disciplinaId: '',
    nota: null
  };

  successMessage = '';
  errorMessage = '';

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

  carregarDisciplinas(): void {
    this.professorService.getDisciplinas().subscribe({
      next: (data) => {
        this.disciplinas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar disciplinas', err);
        this.errorMessage = 'Erro ao carregar disciplinas.';
      }
    });
  }

  onDisciplinaChange(): void {
    this.alunos = []; // Limpar alunos anteriores
    this.form.alunoId = ''; // Resetar seleção de aluno
    if (this.form.disciplinaId) {
      this.carregarAlunos(this.form.disciplinaId);
    }
  }

  carregarAlunos(disciplinaId: number): void {
    this.professorService.getAlunosPorDisciplina(disciplinaId).subscribe({
      next: (data) => {
        this.alunos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar alunos', err);
        this.errorMessage = 'Erro ao carregar lista de alunos.';
      }
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.nota < 0 || this.form.nota > 10) {
      this.errorMessage = 'A nota deve estar entre 0 e 10.';
      return;
    }

    const notaParaLancar = {
      alunoId: this.form.alunoId,
      disciplinaId: this.form.disciplinaId,
      valor: this.form.nota
    };

    console.log('Lançando Nota:', notaParaLancar);

    this.professorService.lancarNota(notaParaLancar).subscribe({
      next: (res) => {
        const alunoNome = this.alunos.find(a => a.id == this.form.alunoId)?.nome;
        const disciplinaNome = this.disciplinas.find(d => d.id == this.form.disciplinaId)?.nome;

        alert(`Nota ${this.form.nota} atribuída ao aluno(a) ${alunoNome} na disciplina ${disciplinaNome}!`);
        this.successMessage = 'Nota lançada com sucesso!';

        // Reset apenas da nota
        this.form.nota = null;
      },
      error: (err) => {
        console.error('Erro ao lançar nota', err);
        this.errorMessage = 'Erro ao salvar nota. Tente novamente.';
      }
    });
  }
}
