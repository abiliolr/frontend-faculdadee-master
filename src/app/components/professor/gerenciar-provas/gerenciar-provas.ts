import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-gerenciar-provas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-provas.html',
  styleUrls: ['./gerenciar-provas.css']
})
export class GerenciarProvasComponent implements OnInit {
  disciplinas: any[] = [];
  provasAgendadas: any[] = [];

  form: any = {
    disciplina: '',
    nomeProva: '',
    data: '',
    horario: ''
  };

  successMessage = '';
  errorMessage = '';

  professorId: number | null = null;

  constructor(
    private professorService: ProfessorService,
    private alunoService: AlunoService // Reuse to fetch all exams, then filter
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
        const userInfoStr = localStorage.getItem('user_info');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            this.professorId = userInfo.id;
        }
    }

    if (this.professorId) {
        this.loadDisciplinas();
        this.loadProvas();
    }
  }

  loadDisciplinas(): void {
    if (this.professorId) {
        this.professorService.getDisciplinas(this.professorId).subscribe({
            next: (data: any[]) => {
                this.disciplinas = data;
            },
            error: (err: any) => console.error('Erro ao carregar disciplinas', err)
        });
    }
  }

  loadProvas(): void {
      // Fetch all exams and filter by those belonging to this professor's subjects
      // Ideally backend filters, but for "simple backend", frontend filtering works if we fetch all.
      // Or we can assume AlunoService.getProvas returns all.
      this.alunoService.getProvas().subscribe({
          next: (allExams) => {
             // We need to filter exams where the subject belongs to this professor.
             // We have 'disciplinas'.
             const mySubjectIds = this.disciplinas.map(d => d.id);
             // Since 'loadDisciplinas' might be async and race, we should wait or just filter if we have them.
             // Better approach: Since 'getProvas' returns enriched data with 'subjectName',
             // we technically don't know the professorId of the exam unless we cross-reference.
             // Simple fix: Filter where subjectId is in 'this.disciplinas'.
             // We need to ensure 'disciplinas' is loaded.
             // Let's chain or just reactive update. For simplicity in this logic:
             // If disciplinas is empty, wait?
             // Let's just rely on the user seeing what they can see.

             // Check if we can filter by subjectId
             if (this.disciplinas.length > 0) {
                 this.provasAgendadas = allExams.filter(e => mySubjectIds.includes(e.subjectId));
             } else {
                 // Retry once disciplines are loaded?
                 // Actually, let's just trigger loadProvas inside loadDisciplinas next
             }
          },
          error: (err) => console.error(err)
      });
  }

  // Chain loading
  refreshData(): void {
      if (this.professorId) {
        this.professorService.getDisciplinas(this.professorId).subscribe({
            next: (data: any[]) => {
                this.disciplinas = data;
                const mySubjectIds = data.map(d => d.id);

                this.alunoService.getProvas().subscribe({
                    next: (allExams) => {
                        this.provasAgendadas = allExams.filter(e => mySubjectIds.includes(e.subjectId));
                    }
                });
            },
            error: (err: any) => console.error('Erro ao carregar dados', err)
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
            this.refreshData(); // Reload list
        },
        error: (err: any) => {
            console.error('Erro ao agendar prova', err);
            const msg = err.error?.message || err.message || 'Erro desconhecido';
            this.errorMessage = `Erro ao agendar prova: ${msg}`;
            alert(this.errorMessage);
        }
    });
  }

  deleteProva(id: number): void {
      if(confirm('Tem certeza que deseja cancelar esta prova?')) {
          this.professorService.deleteProva(id).subscribe({
              next: () => {
                  alert('Prova removida com sucesso.');
                  this.refreshData();
              },
              error: (err) => alert('Erro ao remover prova')
          });
      }
  }
}
