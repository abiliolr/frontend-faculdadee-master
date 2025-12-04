import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciar-provas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-provas.html',
  styleUrls: ['./gerenciar-provas.css']
})
export class GerenciarProvasComponent {
  disciplinas = ['Web II', 'Banco de Dados', 'Engenharia de Software', 'Algoritmos'];

  form: any = {
    disciplina: '',
    nomeProva: '',
    data: ''
  };

  successMessage = '';

  onSubmit(): void {
    this.successMessage = '';
    console.log('Agendando Prova:', this.form);

    // Simulação de sucesso
    alert(`Prova "${this.form.nomeProva}" de ${this.form.disciplina} agendada para ${this.form.data}!`);
    this.successMessage = 'Prova agendada com sucesso!';

    // Reset form
    this.form = { disciplina: '', nomeProva: '', data: '' };
  }
}
