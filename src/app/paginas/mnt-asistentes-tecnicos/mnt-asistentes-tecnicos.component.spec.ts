import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MntAsistentesTecnicosComponent } from './mnt-asistentes-tecnicos.component';

describe('MntAsistentesTecnicosComponent', () => {
  let component: MntAsistentesTecnicosComponent;
  let fixture: ComponentFixture<MntAsistentesTecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntAsistentesTecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntAsistentesTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
