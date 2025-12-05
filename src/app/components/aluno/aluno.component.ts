import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aluno.html',
  styleUrls: ['./aluno.css'],
})
export class AlunoComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
