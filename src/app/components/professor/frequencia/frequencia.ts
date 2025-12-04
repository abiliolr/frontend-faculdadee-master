import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Aluno {
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
export class FrequenciaComponent {
  alunos: Aluno[] = [
    { nome: 'João Silva', presente: true },
    { nome: 'Maria Souza', presente: true },
    { nome: 'Pedro Oliveira', presente: false },
    { nome: 'Ana Costa', presente: true },
    { nome: 'Carlos Pereira', presente: false }
  ];

  toggleStatus(aluno: Aluno): void {
    aluno.presente = !aluno.presente;
  }
}
