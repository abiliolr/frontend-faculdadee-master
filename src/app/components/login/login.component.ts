import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// MUDANÇA 1: Usar um caminho relativo para encontrar o serviço
import { AuthService } from '../../services/auth.service'; 

import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink 
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  form: any = {
    username: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({

      // MUDANÇA 2: Adicionar ': any' para corrigir o erro TS7006
      next: (data: any) => {
        console.log('Login bem-sucedido!', data);
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },

      // MUDANÇA 3: Adicionar ': any' para corrigir o erro TS7006
      error: (err: any) => {
        console.error('Erro no login:', err);
        if (err.error && typeof err.error === 'string') {
            this.errorMessage = err.error; // Erro é uma string simples (ex: "Erro de autenticação...")
        } else if (err.error && err.error.message) {
            this.errorMessage = err.error.message; // Erro é um objeto { "message": "..." }
        } else if (err.message) {
            this.errorMessage = err.message;
        } else {
            this.errorMessage = 'Erro desconhecido. Tente novamente.';
        }
      }
    });
  }
}