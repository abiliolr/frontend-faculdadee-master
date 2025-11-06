import { Routes } from '@angular/router';

// MUDANÇA 1: Importe os componentes
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register'; // <-- ADICIONAR ISSO
import { AlunoComponent } from './components/aluno/aluno.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfessorComponent } from './components/professor/professor.component';
export const routes: Routes = [
  // MUDANÇA 2: Adiciona a rota para /login
  { path: 'login', component: LoginComponent },

  // <-- ADICIONAR ISSO
  { path: 'register', component: RegisterComponent },

  { path: 'aluno', component: AlunoComponent },

  { path: 'admin', component: AdminComponent },

  { path: 'professor', component: ProfessorComponent },

  // MUDANÇA 3: Adiciona a rota para /home
  { path: 'home', component: HomeComponent }, // O usuário é enviado para cá após o login

  // MUDANÇA 4: Redireciona a rota raiz (/) para a página de login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // MUDANÇA 5: Uma rota "catch-all" (opcional, mas boa prática)
  { path: '**', redirectTo: 'login' },
];
