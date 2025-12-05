import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-cadastrar-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-professor.html',
  styleUrls: ['./cadastrar-professor.css']
})
export class CadastrarProfessorComponent implements OnInit {
  professores: any[] = [];
  form: any = {
    name: '',
    username: '',
    password: '',
    email: '',
    role: 'professor'
  };

  successMessage = '';
  errorMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProfessores();
  }

  loadProfessores(): void {
    this.adminService.getProfessores().subscribe({
      next: (data) => this.professores = data,
      error: (err) => console.error('Erro ao carregar professores', err)
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const payload = { ...this.form };

    this.adminService.createUser(payload).subscribe({
      next: (res) => {
        this.successMessage = 'Professor cadastrado com sucesso!';
        this.form = { name: '', username: '', password: '', email: '', role: 'professor' };
        this.loadProfessores();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Erro ao cadastrar professor';
      }
    });
  }

  deleteProfessor(id: number): void {
    if (confirm('Tem certeza que deseja remover este professor?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => this.loadProfessores(),
        error: (err: any) => {
            console.error('Delete error:', err);
            const msg = err.error?.message || err.message || 'Erro desconhecido';
            alert(`Erro ao remover professor: ${msg}`);
        }
      });
    }
  }
}
