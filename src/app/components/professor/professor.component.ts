import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './professor.html',
  styleUrls: ['./professor.css'],
})
export class ProfessorComponent{}
