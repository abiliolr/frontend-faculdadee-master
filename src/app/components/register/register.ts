import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ajuste o caminho se necessário

// Imports necessários para formulários e diretivas
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, // Importa CommonModule
    FormsModule,   // Importa FormsModule
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  form: any = {
    login: '',
    usuarioNome: '',
    email: '',
    senha: ''
  };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    // Os nomes dos campos (login, senha, email, usuarioNome)
    // devem bater com o que o DTO/Model do backend espera
    const { login, usuarioNome, email, senha } = this.form;

    this.authService.register({ login, usuarioNome, email, senha }).subscribe({
      next: (data: any) => {
        console.log('Registro bem-sucedido!', data);
        this.errorMessage = '';
        // Redireciona para o login após o sucesso
        this.router.navigate(['/login']); 
      },
      error: (err: any) => {
        console.error('Erro no registro:', err);
        // MUDANÇA: Melhorar a extração da mensagem de erro
        if (err.error && typeof err.error === 'string') {
            this.errorMessage = err.error; // Erro é uma string simples (ex: "Preencha todos os campos...")
        } else if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
        } else if (err.message) {
            this.errorMessage = err.message;
        } else {
            this.errorMessage = 'Erro desconhecido. Tente novamente.';
        }
      }
    });
  }
}