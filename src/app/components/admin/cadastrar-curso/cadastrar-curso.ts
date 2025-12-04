import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTAR
import { AuthService } from '../../../services/auth.service';

/**
 * Component for registering a new course (Curso).
 *
 * @remarks
 * This component is part of the Admin dashboard. It provides a form to input course details
 * such as name, code, and coordinator.
 */
@Component({
  selector: 'app-cadastrar-curso',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONAR
  templateUrl: './cadastrar-curso.html',
  styleUrls: ['./cadastrar-curso.css']
})
export class CadastrarCursoComponent {
  
  /**
   * The form data model for course registration.
   */
  form: any = {
    nome: '',
    codigo: '',
    coordenador: ''
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
   * Creates an instance of CadastrarCursoComponent.
   *
   * @param {AuthService} authService - The service used for backend communication (placeholder).
   */
  constructor(private authService: AuthService) { }

  /**
   * Handles the form submission for registering a course.
   *
   * @remarks
   * Currently logs the form data to the console and simulates a successful registration.
   * Clears the form upon completion.
   */
  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Salvando Curso:', this.form);
    this.successMessage = 'Curso cadastrado com sucesso! (Simulação)';
    this.form = { nome: '', codigo: '', coordenador: '' };
  }
}
