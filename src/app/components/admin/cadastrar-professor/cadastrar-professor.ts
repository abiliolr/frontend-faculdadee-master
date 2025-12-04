import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTAR
import { AuthService } from '../../../services/auth.service';

/**
 * Component for registering a new professor.
 *
 * @remarks
 * This component is part of the Admin dashboard. It provides a form to input professor details
 * such as name, department, and email.
 */
@Component({
  selector: 'app-cadastrar-professor',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONAR
  templateUrl: './cadastrar-professor.html',
  styleUrls: ['./cadastrar-professor.css'] // Vamos criar este CSS
})
export class CadastrarProfessorComponent { // Adicionado "Component"
  
  /**
   * The form data model for professor registration.
   */
  form: any = {
    nome: '',
    departamento: '',
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
   * Creates an instance of CadastrarProfessorComponent.
   *
   * @param {AuthService} authService - The service used for backend communication (placeholder).
   */
  constructor(private authService: AuthService) { }

  /**
   * Handles the form submission for registering a professor.
   *
   * @remarks
   * Currently logs the form data to the console and simulates a successful registration.
   * Clears the form upon completion.
   */
  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Salvando Professor:', this.form);
    this.successMessage = 'Professor cadastrado com sucesso! (Simulação)';
    this.form = { nome: '', departamento: '', email: '' }; 
  }
}
