import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarAlunoComponent } from './cadastrar-aluno';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CadastrarAlunoComponent', () => {
  let component: CadastrarAlunoComponent;
  let fixture: ComponentFixture<CadastrarAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarAlunoComponent, HttpClientTestingModule, FormsModule],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
