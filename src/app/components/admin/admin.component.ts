import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTE OS MÓDULOS DE ROTA
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * The component for the Admin dashboard.
 *
 * @remarks
 * This component serves as the main layout for the administrative interface.
 * It uses `RouterOutlet` to render child routes (e.g., student registration, course creation)
 * and `RouterLink` for navigation.
 */
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
export class AdminComponent{}
