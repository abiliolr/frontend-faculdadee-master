import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';

interface DisciplinaNota {
  subjectName: string;
  value: number;
  // TODO: Backend needs to support Nota 1 and Nota 2 specifically if we want to match this exact UI,
  // but for now we will adapt to show what we have.
  // The backend currently returns a single 'value'.
  // We can mock the missing fields or update backend later.
}

@Component({
  selector: 'app-boletim-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boletim-aluno.html',
  styleUrls: ['./boletim-aluno.css']
})
export class BoletimAlunoComponent implements OnInit {
  disciplinas: any[] = [];
  mediaAprovacao = 7.0;

  // TODO: Get real student ID from Auth Service
  studentId = 3;

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService.getBoletim(this.studentId).subscribe({
      next: (data: any[]) => {
        // Adapt backend data to UI expectation
        // Backend returns: { id, studentId, subjectId, value, subjectName }
        this.disciplinas = data.map((d: any) => ({
          nome: d.subjectName,
          nota1: d.value,
          nota2: null // Backend doesn't support 2 grades yet
        }));
      },
      error: (err: any) => console.error('Erro ao buscar boletim', err)
    });
  }

  calcularMedia(d: any): string {
    if (d.nota2 === null) return d.nota1.toFixed(1); // Show just the one grade for now
    return ((d.nota1 + d.nota2) / 2).toFixed(1);
  }

  calcularSituacao(d: any): string {
    if (d.nota2 === null) return 'Cursando';
    const media = (d.nota1 + d.nota2) / 2;
    return media >= this.mediaAprovacao ? 'Aprovado' : 'Prova Final';
  }

  calcularNotaNecessaria(d: any): string {
    if (d.nota2 !== null) {
      const media = (d.nota1 + d.nota2) / 2;
      return media >= this.mediaAprovacao ? 'Aprovado' : 'Recuperação';
    }
    const necessaria = (this.mediaAprovacao * 2) - d.nota1;
    if (necessaria <= 0) return '0.0';
    if (necessaria > 10) return 'Impossível (PF)';
    return necessaria.toFixed(1);
  }
}
