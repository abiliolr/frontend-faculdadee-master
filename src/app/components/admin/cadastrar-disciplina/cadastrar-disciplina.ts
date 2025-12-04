import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTAR
import { AuthService } from '../../../services/auth.service';

/**
 * Component for registering a new discipline (Disciplina).
 *
 * @remarks
 * This component is part of the Admin dashboard. It provides a form to input discipline details
 * such as name, code, and workload (carga horária).
 */
@Component({
  selector: 'app-cadastrar-disciplina',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONAR
  templateUrl: './cadastrar-disciplina.html',
  styleUrls: ['./cadastrar-disciplina.css']
})
export class CadastrarDisciplinaComponent { // Adicionado "Component"
  
  /**
   * The form data model for discipline registration.
   */
  form: any = {
    nome: '',
    codigo: '',
    cargaHoraria: null
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
   * Creates an instance of CadastrarDisciplinaComponent.
   *
   * @param {AuthService} authService - The service used for backend communication (placeholder).
   */
  constructor(private authService: AuthService) { }

  /**
   * Handles the form submission for registering a discipline.
   *
   * @remarks
   * Currently logs the form data to the console and simulates a successful registration.
   * Clears the form upon completion.
   */
  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Salvando Disciplina:', this.form);
    this.successMessage = 'Disciplina cadastrada com sucesso! (Simulação)';
    this.form = { nome: '', codigo: '', cargaHoraria: null };
  }
}
