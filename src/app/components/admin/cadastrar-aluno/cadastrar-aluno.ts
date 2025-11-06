import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. IMPORTAR FormsModule
import { AuthService } from '../../../services/auth.service'; // 2. IMPORTAR AuthService (ou AdminService)

@Component({
  selector: 'app-cadastrar-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule], // 3. ADICIONAR FormsModule
  templateUrl: './cadastrar-aluno.html',
  styleUrls: ['./cadastrar-aluno.css']
})
export class CadastrarAlunoComponent { // 4. RENOMEADO de CadastrarAluno para CadastrarAlunoComponent
  
  // 5. Lógica do formulário (baseado no register.ts)
  form: any = {
    matricula: '',
    nome: '',
    curso: '',
    email: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) { } // 6. INJETAR serviço

  // 7. Método onSubmit
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