import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarCursoComponent } from './cadastrar-curso';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CadastrarCursoComponent', () => {
  let component: CadastrarCursoComponent;
  let fixture: ComponentFixture<CadastrarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarCursoComponent, HttpClientTestingModule, FormsModule],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
