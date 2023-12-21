import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentsroomComponent } from './comentsroom.component';

describe('ComentsroomComponent', () => {
  let component: ComentsroomComponent;
  let fixture: ComponentFixture<ComentsroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComentsroomComponent]
    });
    fixture = TestBed.createComponent(ComentsroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
