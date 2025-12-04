import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DisciplinaFrequencia {
  nome: string;
  aulasDadas: number;
  presencas: number;
  faltas: number;
}

@Component({
  selector: 'app-frequencia-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frequencia-aluno.html',
  styleUrls: ['./frequencia-aluno.css']
})
export class FrequenciaAlunoComponent {
  disciplinas: DisciplinaFrequencia[] = [
    { nome: 'Desenvolvimento Web II', aulasDadas: 40, presencas: 38, faltas: 2 },
    { nome: 'Banco de Dados', aulasDadas: 40, presencas: 30, faltas: 10 },
    { nome: 'Engenharia de Software', aulasDadas: 36, presencas: 36, faltas: 0 },
    { nome: 'Estrutura de Dados', aulasDadas: 60, presencas: 45, faltas: 15 } // Muitas faltas
  ];

  maximoFaltasPercentual = 0.25; // 25%

  calcularPorcentagemFrequencia(d: DisciplinaFrequencia): number {
    if (d.aulasDadas === 0) return 100;
    return (d.presencas / d.aulasDadas) * 100;
  }

  calcularFaltasRestantes(d: DisciplinaFrequencia): number | string {
    const maxFaltasPermitidas = Math.floor(d.aulasDadas * this.maximoFaltasPercentual);
    const restantes = maxFaltasPermitidas - d.faltas;

    if (restantes < 0) return 'Reprovado por Faltas';
    return restantes;
  }
}
