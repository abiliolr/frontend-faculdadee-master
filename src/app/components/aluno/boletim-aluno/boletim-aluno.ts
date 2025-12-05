import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';

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

  studentId: number | null = null;

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    // 1. Get User ID from localStorage
    if (typeof localStorage !== 'undefined') {
        const userInfoStr = localStorage.getItem('user_info');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            this.studentId = userInfo.id;
        }
    }

    if (this.studentId) {
        this.alunoService.getBoletim(this.studentId).subscribe({
        next: (data: any[]) => {
            this.disciplinas = data.map((d: any) => ({
                nome: d.subjectName,
                nota1: d.nota1,
                nota2: d.nota2
            // Adapt backend data to UI expectation
            this.disciplinas = data.map((d: any) => ({
            nome: d.subjectName,
            nota1: d.value, // Can be null now
            nota2: null
            }));
        },
        error: (err: any) => console.error('Erro ao buscar boletim', err)
        });
    } else {
        console.error('ID do aluno não encontrado no localStorage');
    }
  }

  calcularMedia(d: any): string {
    if (d.nota1 === null) return '-';
    if (d.nota2 === null) return Number(d.nota1).toFixed(1);
    const n1 = Number(d.nota1);
    const n2 = Number(d.nota2);
    return ((n1 + n2) / 2).toFixed(1);
    return ((d.nota1 + d.nota2) / 2).toFixed(1);
  }

  calcularSituacao(d: any): string {
    if (d.nota1 === null) return 'Não avaliado';
    if (d.nota2 === null) return 'Cursando';

    const n1 = Number(d.nota1);
    const n2 = Number(d.nota2);
    const media = (n1 + n2) / 2;

    // Updated logic per request: If both grades present and < 7, status is Reprovado
    return media >= this.mediaAprovacao ? 'Aprovado' : 'Reprovado';
  }

  calcularNotaNecessaria(d: any): string {
    if (d.nota1 === null) return '-';
    if (d.nota2 !== null) {
      const n1 = Number(d.nota1);
      const n2 = Number(d.nota2);
      const media = (n1 + n2) / 2;
      return media >= this.mediaAprovacao ? 'Aprovado' : 'Reprovado';
    }
    const n1 = Number(d.nota1);
    const necessaria = (this.mediaAprovacao * 2) - n1;
    const necessaria = (this.mediaAprovacao * 2) - d.nota1;
    if (necessaria <= 0) return '0.0';
    if (necessaria > 10) return 'Impossível (PF)';
    return necessaria.toFixed(1);
  }
}
