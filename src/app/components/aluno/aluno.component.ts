import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluno.html',
  styleUrls: ['./aluno.css'],
})
export class AlunoComponent {
  disciplinaSelecionada: string = '';
  dados: any = null;

  mostrarCard(disciplina: string) {
    this.disciplinaSelecionada = disciplina;

    const faltas = Math.floor(Math.random() * 10);
    const presencas = 60 - faltas;
    const nota1 = (Math.random() * 10).toFixed(1);
    const nota2 = (Math.random() * 10).toFixed(1);
    const media = (Number(nota1) + Number(nota2)) / 2;
    const mediaFormatada = media.toFixed(1);
    const notaNecessaria = media >= 7 ? 'Aprovado' : (7 * 2 - media).toFixed(1);

    const horariosProvas = ['03/12 · 09:00', '20/12 · 13:30'];

    this.dados = {
      disciplina,
      faltas,
      faltasRestantes: 10 - faltas,
      presencas,
      nota1,
      nota2,
      media: mediaFormatada,
      notaNecessaria,
      horariosProvas,
    };
  }
}
