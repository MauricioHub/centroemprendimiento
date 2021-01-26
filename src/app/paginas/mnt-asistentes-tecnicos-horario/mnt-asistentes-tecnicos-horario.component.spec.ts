import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MntAsistentesTecnicosHorarioComponent } from './mnt-asistentes-tecnicos-horario.component';

describe('MntAsistentesTecnicosHorarioComponent', () => {
  let component: MntAsistentesTecnicosHorarioComponent;
  let fixture: ComponentFixture<MntAsistentesTecnicosHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntAsistentesTecnicosHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntAsistentesTecnicosHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
