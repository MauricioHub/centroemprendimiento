import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaConsultaCalendarioComponent } from './mesa-consulta-calendario.component';

describe('MesaConsultaCalendarioComponent', () => {
  let component: MesaConsultaCalendarioComponent;
  let fixture: ComponentFixture<MesaConsultaCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaConsultaCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaConsultaCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
