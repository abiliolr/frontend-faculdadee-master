import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTAR
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastrar-disciplina',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONAR
  templateUrl: './cadastrar-disciplina.html',
  styleUrls: ['./cadastrar-disciplina.css']
})
export class CadastrarDisciplinaComponent { // Adicionado "Component"
  
  form: any = {
    nome: '',
    codigo: '',
    cargaHoraria: null
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Salvando Disciplina:', this.form);
    this.successMessage = 'Disciplina cadastrada com sucesso! (Simulação)';
    this.form = { nome: '', codigo: '', cargaHoraria: null };
  }
}