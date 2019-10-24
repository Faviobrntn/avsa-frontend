import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosComponent } from './registros.component';

describe('RegistrosComponent', () => {
  let component: RegistrosComponent;
  let fixture: ComponentFixture<RegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
