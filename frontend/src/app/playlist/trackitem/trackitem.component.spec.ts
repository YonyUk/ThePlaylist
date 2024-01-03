import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackitemComponent } from './trackitem.component';

describe('TrackitemComponent', () => {
  let component: TrackitemComponent;
  let fixture: ComponentFixture<TrackitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackitemComponent]
    });
    fixture = TestBed.createComponent(TrackitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
