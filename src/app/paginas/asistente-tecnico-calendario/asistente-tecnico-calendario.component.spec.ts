import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteTecnicoCalendarioComponent } from './asistente-tecnico-calendario.component';

describe('AsistenteTecnicoCalendarioComponent', () => {
  let component: AsistenteTecnicoCalendarioComponent;
  let fixture: ComponentFixture<AsistenteTecnicoCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenteTecnicoCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenteTecnicoCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
