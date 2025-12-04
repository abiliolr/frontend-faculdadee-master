import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atribuir-nota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atribuir-nota.html',
  styleUrls: ['./atribuir-nota.css']
})
export class AtribuirNotaComponent {
  disciplinas = ['Web II', 'Banco de Dados', 'Engenharia de Software', 'Algoritmos'];
  alunos = ['João Silva', 'Maria Souza', 'Pedro Oliveira', 'Ana Costa'];

  form: any = {
    aluno: '',
    disciplina: '',
    nota: null
  };

  successMessage = '';
  errorMessage = '';

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.nota < 0 || this.form.nota > 10) {
      this.errorMessage = 'A nota deve estar entre 0 e 10.';
      return;
    }

    console.log('Lançando Nota:', this.form);

    alert(`Nota ${this.form.nota} atribuída ao aluno(a) ${this.form.aluno} na disciplina ${this.form.disciplina}!`);
    this.successMessage = 'Nota lançada com sucesso!';

    // Reset form
    this.form = { aluno: '', disciplina: '', nota: null };
  }
}
