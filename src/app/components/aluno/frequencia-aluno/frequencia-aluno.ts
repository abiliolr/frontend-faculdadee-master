import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-frequencia-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frequencia-aluno.html',
  styleUrls: ['./frequencia-aluno.css']
})
export class FrequenciaAlunoComponent implements OnInit {
  disciplinas: any[] = [];
  maximoFaltasPercentual = 0.25; // 25%

  studentId: number | null = null;

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
        const userInfoStr = localStorage.getItem('user_info');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            this.studentId = userInfo.id;
        }
    }

    if (this.studentId) {
        this.alunoService.getFrequencia(this.studentId).subscribe({
        next: (data: any[]) => {
            // Backend returns: { id, studentId, subjectId, absences, totalClasses, subjectName }
            this.disciplinas = data.map((d: any) => ({
            nome: d.subjectName,
            aulasDadas: d.totalClasses,
            presencas: d.totalClasses - d.absences,
            faltas: d.absences
            }));
        },
        error: (err: any) => console.error('Erro ao buscar frequência', err)
        });
    }
  }

  calcularPorcentagemFrequencia(d: any): number {
    if (d.aulasDadas === 0) return 100;
    return (d.presencas / d.aulasDadas) * 100;
  }

  calcularFaltasRestantes(d: any): number | string {
    const maxFaltasPermitidas = Math.floor(d.aulasDadas * this.maximoFaltasPercentual);
    const restantes = maxFaltasPermitidas - d.faltas;

    if (restantes < 0) return 'Reprovado por Faltas';
    return restantes;
  }
}
