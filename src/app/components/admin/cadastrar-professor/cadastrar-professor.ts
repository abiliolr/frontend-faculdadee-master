import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTAR
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastrar-professor',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONAR
  templateUrl: './cadastrar-professor.html',
  styleUrls: ['./cadastrar-professor.css'] // Vamos criar este CSS
})
export class CadastrarProfessorComponent { // Adicionado "Component"
  
  form: any = {
    nome: '',
    departamento: '',
    email: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Salvando Professor:', this.form);
    this.successMessage = 'Professor cadastrado com sucesso! (Simulação)';
    this.form = { nome: '', departamento: '', email: '' }; 
  }
}