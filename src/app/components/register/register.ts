import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ajuste o caminho se necessário

// Imports necessários para formulários e diretivas
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * The component for user registration.
 *
 * @remarks
 * This component provides a form for new users to create an account.
 * It collects user details (login, name, email, password) and uses `AuthService` to register them.
 */
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

  /**
   * The registration form data model.
   * Includes `login`, `usuarioNome`, `email`, and `senha`.
   */
  form: any = {
    login: '',
    usuarioNome: '',
    email: '',
    senha: ''
  };

  /**
   * Stores any error message returned during the registration process.
   */
  errorMessage = '';

  /**
   * Creates an instance of RegisterComponent.
   *
   * @param {AuthService} authService - The service used for authentication and registration.
   * @param {Router} router - The Angular router used for navigation.
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Handles the form submission for registration.
   *
   * @remarks
   * Calls the `register` method of `AuthService` with the form data.
   * If successful, navigates to the login page.
   * If an error occurs, it parses the error response and displays it.
   */
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
        
        // MUDANÇA: Lógica de erro ajustada para capturar a resposta do backend
        if (err.error && err.error.error) {
            // Captura a resposta do backend (Map.of("error", ...))
            // err.error é o JSON, err.error.error é a string da mensagem
            this.errorMessage = err.error.error; 
        } else if (err.error && typeof err.error === 'string') {
            // Captura erros que são apenas strings (ex: do login)
            this.errorMessage = err.error;
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
