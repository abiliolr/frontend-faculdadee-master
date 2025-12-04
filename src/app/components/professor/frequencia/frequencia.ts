import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';

interface Aluno {
  id: number;
  nome: string;
  presente: boolean;
}

@Component({
  selector: 'app-frequencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './frequencia.html',
  styleUrls: ['./frequencia.css']
})
export class FrequenciaComponent implements OnInit {
  disciplinas: any[] = [];
  alunos: Aluno[] = [];
  disciplinaSelecionadaId: string = '';

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
      }
    });
  }

  onDisciplinaChange(): void {
    if (this.disciplinaSelecionadaId) {
      this.carregarAlunos(Number(this.disciplinaSelecionadaId));
    }
  }

  carregarAlunos(disciplinaId: number): void {
    this.professorService.getAlunosPorDisciplina(disciplinaId).subscribe({
      next: (data) => {
        // Mapear dados do backend para incluir o campo 'presente' inicializado como true
        this.alunos = data.map((a: any) => ({
          id: a.id,
          nome: a.nome,
          presente: true // Default presente
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar alunos', err);
        this.errorMessage = 'Erro ao carregar lista de alunos.';
      }
    });
  }

  toggleStatus(aluno: Aluno): void {
    aluno.presente = !aluno.presente;
  }

  salvarFrequencia(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const frequenciaData = {
      disciplinaId: this.disciplinaSelecionadaId,
      data: new Date().toISOString().split('T')[0], // Data de hoje YYYY-MM-DD
      presencas: this.alunos.map(a => ({
        alunoId: a.id,
        presente: a.presente
      }))
    };

    console.log('Salvando Frequência:', frequenciaData);

    this.professorService.salvarFrequencia(frequenciaData).subscribe({
      next: (res) => {
        alert('Frequência salva com sucesso!');
        this.successMessage = 'Frequência registrada com sucesso!';
      },
      error: (err) => {
        console.error('Erro ao salvar frequência', err);
        this.errorMessage = 'Erro ao salvar frequência. Tente novamente.';
      }
    });
  }
}
