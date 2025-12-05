import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';

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
export class CalendarioProvasComponent implements OnInit {
  provas: Prova[] = [];

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
      this.alunoService.getProvas().subscribe({
          next: (data: any[]) => {
              // Backend returns: { id, subjectId, name, date, time, subjectName }
              this.provas = data.map((d: any) => ({
                  disciplina: d.subjectName,
                  nomeProva: d.name,
                  data: d.date,
                  horario: d.time
              }));
          },
          error: (err: any) => console.error('Erro ao buscar provas', err)
      });
  }

  // Ordenar provas por data
  get provasOrdenadas() {
    return this.provas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }
}
