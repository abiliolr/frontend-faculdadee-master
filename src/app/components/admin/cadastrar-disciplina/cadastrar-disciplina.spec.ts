import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarDisciplinaComponent } from './cadastrar-disciplina';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CadastrarDisciplinaComponent', () => {
  let component: CadastrarDisciplinaComponent;
  let fixture: ComponentFixture<CadastrarDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarDisciplinaComponent, HttpClientTestingModule, FormsModule],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
