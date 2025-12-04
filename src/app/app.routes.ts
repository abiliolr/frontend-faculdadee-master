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
import { GerenciarProvasComponent } from './components/professor/gerenciar-provas/gerenciar-provas';
import { AtribuirNotaComponent } from './components/professor/atribuir-nota/atribuir-nota';
import { FrequenciaComponent } from './components/professor/frequencia/frequencia';
import { BoletimAlunoComponent } from './components/aluno/boletim-aluno/boletim-aluno';
import { FrequenciaAlunoComponent } from './components/aluno/frequencia-aluno/frequencia-aluno';
import { CalendarioProvasComponent } from './components/aluno/calendario-provas/calendario-provas';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'aluno',
    component: AlunoComponent,
    children: [
        { path: 'boletim', component: BoletimAlunoComponent },
        { path: 'frequencia', component: FrequenciaAlunoComponent },
        { path: 'provas', component: CalendarioProvasComponent },
        { path: '', redirectTo: 'boletim', pathMatch: 'full' }
    ]
  },
  { path: 'aluno', component: AlunoComponent },
  {
    path: 'professor',
    component: ProfessorComponent,
    children: [
      { path: 'gerenciar-provas', component: GerenciarProvasComponent },
      { path: 'atribuir-nota', component: AtribuirNotaComponent },
      { path: 'frequencia', component: FrequenciaComponent },
      { path: '', redirectTo: 'gerenciar-provas', pathMatch: 'full' }
    ]
  },
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
