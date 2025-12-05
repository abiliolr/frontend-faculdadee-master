import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-cadastrar-disciplina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-disciplina.html',
  styleUrls: ['./cadastrar-disciplina.css']
})
export class CadastrarDisciplinaComponent implements OnInit {
  disciplinas: any[] = [];
  professores: any[] = [];
  form: any = {
    name: '',
    professorId: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.adminService.getDisciplinas().subscribe({
      next: (data) => this.disciplinas = data,
      error: (err) => console.error('Erro ao carregar disciplinas', err)
    });

    this.adminService.getProfessores().subscribe({
      next: (data) => this.professores = data,
      error: (err) => console.error('Erro ao carregar professores', err)
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.adminService.createDisciplina(this.form).subscribe({
      next: (res) => {
        this.successMessage = 'Disciplina cadastrada com sucesso!';
        this.form = { name: '', professorId: '' };
        this.loadData(); // Reload list
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Erro ao cadastrar disciplina';
      }
    });
  }

  deleteDisciplina(id: number): void {
    if (confirm('Tem certeza que deseja remover esta disciplina?')) {
      this.adminService.deleteDisciplina(id).subscribe({
        next: () => this.loadData(),
        error: (err) => alert('Erro ao remover disciplina')
      });
    }
  }
}
