import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DisciplinaNota {
  nome: string;
  nota1: number;
  nota2: number | null;
}

@Component({
  selector: 'app-boletim-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boletim-aluno.html',
  styleUrls: ['./boletim-aluno.css']
})
export class BoletimAlunoComponent {
  disciplinas: DisciplinaNota[] = [
    { nome: 'Desenvolvimento Web II', nota1: 8.5, nota2: 7.0 },
    { nome: 'Banco de Dados', nota1: 6.0, nota2: null }, // Nota 2 não lançada
    { nome: 'Engenharia de Software', nota1: 9.0, nota2: 9.5 },
    { nome: 'Estrutura de Dados', nota1: 5.5, nota2: 6.0 }
  ];

  mediaAprovacao = 7.0;

  calcularMedia(d: DisciplinaNota): string {
    if (d.nota2 === null) return '-';
    return ((d.nota1 + d.nota2) / 2).toFixed(1);
  }

  calcularSituacao(d: DisciplinaNota): string {
    if (d.nota2 === null) return 'Cursando';
    const media = (d.nota1 + d.nota2) / 2;
    return media >= this.mediaAprovacao ? 'Aprovado' : 'Prova Final';
  }

  calcularNotaNecessaria(d: DisciplinaNota): string {
    // Se já temos as duas notas, verificamos se passou
    if (d.nota2 !== null) {
      const media = (d.nota1 + d.nota2) / 2;
      return media >= this.mediaAprovacao ? 'Aprovado' : 'Recuperação';
    }

    // Se falta a nota 2, quanto precisa tirar nela para ficar com média 7?
    // (Nota1 + Nota2) / 2 = 7 => Nota1 + Nota2 = 14 => Nota2 = 14 - Nota1
    const necessaria = (this.mediaAprovacao * 2) - d.nota1;
    // Se o cálculo der negativo (já passou só com a 1ª nota - impossível na média simples mas matematicamente existe), mostra 0
    if (necessaria <= 0) return '0.0';
    // Se for maior que 10, é impossível passar direto
    if (necessaria > 10) return 'Impossível (PF)';

    return necessaria.toFixed(1);
  }
}
