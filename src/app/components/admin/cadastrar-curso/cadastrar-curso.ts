import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTAR
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastrar-curso',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONAR
  templateUrl: './cadastrar-curso.html',
  styleUrls: ['./cadastrar-curso.css']
})
export class CadastrarCursoComponent {
  
  form: any = {
    nome: '',
    codigo: '',
    coordenador: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Salvando Curso:', this.form);
    this.successMessage = 'Curso cadastrado com sucesso! (Simulação)';
    this.form = { nome: '', codigo: '', coordenador: '' };
  }
}