import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarProfessorComponent } from './cadastrar-professor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CadastrarProfessorComponent', () => {
  let component: CadastrarProfessorComponent;
  let fixture: ComponentFixture<CadastrarProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarProfessorComponent, HttpClientTestingModule, FormsModule],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
