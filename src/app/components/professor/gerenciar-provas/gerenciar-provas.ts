import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-gerenciar-provas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-provas.html',
  styleUrls: ['./gerenciar-provas.css']
})
export class GerenciarProvasComponent implements OnInit {
  disciplinas: any[] = [];
  provas: any[] = [];

  form: any = {
    disciplinaId: '',
    nomeProva: '',
    data: ''
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
    if (this.form.disciplinaId) {
      this.carregarProvas(this.form.disciplinaId);
    }
  }

  carregarProvas(disciplinaId: number): void {
    this.professorService.getProvas(disciplinaId).subscribe({
      next: (data) => {
        this.provas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar provas', err);
        // Não necessariamente um erro visual, pode ser apenas vazio
        this.provas = [];
      }
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Preparar objeto para envio (mapear form para o esperado pelo backend)
    const provaParaSalvar = {
      disciplinaId: this.form.disciplinaId,
      nome: this.form.nomeProva,
      data: this.form.data
    };

    console.log('Agendando Prova:', provaParaSalvar);

    this.professorService.criarProva(provaParaSalvar).subscribe({
      next: (res) => {
        const disciplinaNome = this.disciplinas.find(d => d.id == this.form.disciplinaId)?.nome;
        alert(`Prova "${this.form.nomeProva}" de ${disciplinaNome} agendada para ${this.form.data}!`);
        this.successMessage = 'Prova agendada com sucesso!';

        // Atualizar lista de provas
        this.carregarProvas(this.form.disciplinaId);

        // Reset form (mantendo a disciplina selecionada para facilidade)
        this.form.nomeProva = '';
        this.form.data = '';
      },
      error: (err) => {
        console.error('Erro ao agendar prova', err);
        this.errorMessage = 'Erro ao agendar prova. Tente novamente.';
      }
    });
  }
}
