import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-cadastrar-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-aluno.html',
  styleUrls: ['./cadastrar-aluno.css']
})
export class CadastrarAlunoComponent implements OnInit {
  alunos: any[] = [];
  form: any = {
    name: '',
    username: '',
    password: '',
    email: '',
    role: 'student'
  };

  successMessage = '';
  errorMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAlunos();
  }

  loadAlunos(): void {
    this.adminService.getAlunos().subscribe({
      next: (data) => this.alunos = data,
      error: (err) => console.error('Erro ao carregar alunos', err)
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Backend expects { username, password, name, role } or { login, ... }
    const payload = { ...this.form };

    this.adminService.createUser(payload).subscribe({
      next: (res) => {
        this.successMessage = 'Aluno cadastrado com sucesso!';
        this.form = { name: '', username: '', password: '', email: '', role: 'student' };
        this.loadAlunos();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Erro ao cadastrar aluno';
      }
    });
  }

  deleteAluno(id: number): void {
    if (confirm('Tem certeza que deseja remover este aluno?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => this.loadAlunos(),
        error: (err) => alert('Erro ao remover aluno')
      });
    }
  }
}
