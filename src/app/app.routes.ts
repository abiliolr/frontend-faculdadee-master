import { Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register';
import { AlunoComponent } from './components/aluno/aluno.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { CadastrarAlunoComponent } from './components/admin/cadastrar-aluno/cadastrar-aluno';
import { CadastrarCursoComponent } from './components/admin/cadastrar-curso/cadastrar-curso';
import { CadastrarProfessorComponent } from './components/admin/cadastrar-professor/cadastrar-professor';
import { CadastrarDisciplinaComponent } from './components/admin/cadastrar-disciplina/cadastrar-disciplina';

/**
 * Defines the routes for the application.
 *
 * @remarks
 * This array configures the navigation paths and associates them with their corresponding components.
 * It includes routes for login, registration, home, student (aluno), professor, and admin dashboards.
 * The admin route has child routes for managing various entities.
 *
 * @type {Routes}
 */
export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aluno', component: AlunoComponent },
  { path: 'professor', component: ProfessorComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      { path: 'cadastrar-aluno', component: CadastrarAlunoComponent },
      { path: 'cadastrar-curso', component: CadastrarCursoComponent },
      { path: 'cadastrar-professor', component: CadastrarProfessorComponent },
      { path: 'cadastrar-disciplina', component: CadastrarDisciplinaComponent },
      { path: '', redirectTo: 'cadastrar-aluno', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
