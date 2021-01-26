import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEmprendedoresComponent } from './consulta-emprendedores.component';

describe('ConsultaEmprendedoresComponent', () => {
  let component: ConsultaEmprendedoresComponent;
  let fixture: ComponentFixture<ConsultaEmprendedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEmprendedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEmprendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
