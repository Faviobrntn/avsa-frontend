import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosFormComponent } from './registros-form.component';

describe('RegistrosFormComponent', () => {
  let component: RegistrosFormComponent;
  let fixture: ComponentFixture<RegistrosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
