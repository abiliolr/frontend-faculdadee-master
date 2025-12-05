import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,    
    RouterLink,    
    RouterLinkActive 
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
