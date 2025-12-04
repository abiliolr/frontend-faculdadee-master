import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Prova {
  disciplina: string;
  nomeProva: string;
  data: string;
  horario: string;
}

@Component({
  selector: 'app-calendario-provas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-provas.html',
  styleUrls: ['./calendario-provas.css']
})
export class CalendarioProvasComponent {
  provas: Prova[] = [
    { disciplina: 'Desenvolvimento Web II', nomeProva: 'Prova Prática 1', data: '2023-10-15', horario: '19:00' },
    { disciplina: 'Banco de Dados', nomeProva: 'Avaliação Teórica', data: '2023-10-18', horario: '20:50' },
    { disciplina: 'Engenharia de Software', nomeProva: 'Apresentação de Projeto', data: '2023-11-05', horario: '19:00' },
    { disciplina: 'Estrutura de Dados', nomeProva: 'Exame Final', data: '2023-12-10', horario: '19:00' }
  ];

  // Ordenar provas por data
  get provasOrdenadas() {
    return this.provas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }
}
