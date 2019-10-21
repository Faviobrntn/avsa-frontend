import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogosComponent } from './dialogos.component';

describe('DialogosComponent', () => {
  let component: DialogosComponent;
  let fixture: ComponentFixture<DialogosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
