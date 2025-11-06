import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTE OS MÓDULOS DE ROTA
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

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