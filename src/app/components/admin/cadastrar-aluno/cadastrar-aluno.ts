import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. IMPORTAR FormsModule
import { AuthService } from '../../../services/auth.service'; // 2. IMPORTAR AuthService (ou AdminService)

/**
 * Component for registering a new student (Aluno).
 *
 * @remarks
 * This component is part of the Admin dashboard. It provides a form to input student details
 * such as matriculation number, name, course, and email.
 */
@Component({
  selector: 'app-cadastrar-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule], // 3. ADICIONAR FormsModule
  templateUrl: './cadastrar-aluno.html',
  styleUrls: ['./cadastrar-aluno.css']
})
export class CadastrarAlunoComponent { // 4. RENOMEADO de CadastrarAluno para CadastrarAlunoComponent
  
  // 5. Lógica do formulário (baseado no register.ts)
  /**
   * The form data model for student registration.
   */
  form: any = {
    matricula: '',
    nome: '',
    curso: '',
    email: ''
  };

  /**
   * Message to display upon error.
   */
  errorMessage = '';

  /**
   * Message to display upon successful registration.
   */
  successMessage = '';

  /**
   * Creates an instance of CadastrarAlunoComponent.
   *
   * @param {AuthService} authService - The service used for backend communication (placeholder for future implementation).
   */
  constructor(private authService: AuthService) { } // 6. INJETAR serviço

  // 7. Método onSubmit
  /**
   * Handles the form submission for registering a student.
   *
   * @remarks
   * Currently logs the form data to the console and simulates a successful registration.
   * Clears the form upon completion.
   */
  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Salvando Aluno:', this.form);

    // No futuro, você chamará seu serviço de backend aqui
    // this.authService.cadastrarAluno(this.form).subscribe({ ... });

    // Simulação de sucesso
    this.successMessage = 'Aluno cadastrado com sucesso! (Simulação)';
    this.form = { matricula: '', nome: '', curso: '', email: '' }; // Limpa o formulário
  }
}
