import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDisciplina } from './cadastrar-disciplina';

describe('CadastrarDisciplina', () => {
  let component: CadastrarDisciplina;
  let fixture: ComponentFixture<CadastrarDisciplina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarDisciplina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarDisciplina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
