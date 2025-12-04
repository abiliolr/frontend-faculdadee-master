import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aluno.html',
  styleUrls: ['./aluno.css'],
})
export class AlunoComponent {
  // Logic moved to child components
}
