import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-gerenciar-provas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-provas.html',
  styleUrls: ['./gerenciar-provas.css']
})
export class GerenciarProvasComponent implements OnInit {
  disciplinas: any[] = [];

  form: any = {
    disciplina: '',
    nomeProva: '',
    data: '',
    horario: ''
  };

  successMessage = '';
  errorMessage = '';

  professorId: number | null = null;

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
        const userInfoStr = localStorage.getItem('user_info');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            this.professorId = userInfo.id;
        }
    }

    if (this.professorId) {
        this.professorService.getDisciplinas(this.professorId).subscribe({
            next: (data: any[]) => {
                this.disciplinas = data;
                if (this.disciplinas.length === 0) {
                    console.log('Nenhuma disciplina atribuída a este professor.');
                }
            },
            error: (err: any) => console.error('Erro ao carregar disciplinas', err)
        });
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const payload = {
        subjectId: parseInt(this.form.disciplina),
        name: this.form.nomeProva,
        date: this.form.data,
        time: this.form.horario
    };

    this.professorService.agendarProva(payload).subscribe({
        next: (res: any) => {
            const discNome = this.disciplinas.find(d => d.id === payload.subjectId)?.name;
            alert(`Prova "${this.form.nomeProva}" de ${discNome} agendada com sucesso!`);
            this.successMessage = 'Prova agendada com sucesso!';
            this.form = { disciplina: '', nomeProva: '', data: '', horario: '' };
        },
        error: (err: any) => {
            console.error('Erro ao agendar prova', err);
            this.errorMessage = 'Erro ao agendar prova. Tente novamente.';
        }
    });
  }
}
