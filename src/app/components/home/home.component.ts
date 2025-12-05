import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  userRole: string = '';
  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
        const userInfoStr = localStorage.getItem('user_info');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            this.userRole = userInfo.role;
            this.userName = userInfo.name;
        }
    }
  }

  navigateTo(path: string, requiredRole: string): void {
    if (this.userRole === requiredRole || this.userRole === 'admin') {
      // Admin can access everything, or strict role check?
      // User asked: "se ele é aluno ele so consegue entrar no painel aluno..."
      // So strict check seems appropriate, EXCEPT maybe Admin managing things.
      // But adhering strictly to user request:
      if (this.userRole === requiredRole) {
        this.router.navigate([path]);
      } else {
        alert(`Acesso negado. Você está logado como ${this.userRole} e não pode acessar o painel de ${requiredRole}.`);
      }
    } else {
        // Fallback for when admin tries to access others?
        // Let's implement strict separation as requested.
        alert(`Acesso negado. Apenas ${requiredRole} pode acessar esta área.`);
    }
  }
}
