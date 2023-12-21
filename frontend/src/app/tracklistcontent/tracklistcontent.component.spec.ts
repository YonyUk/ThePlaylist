import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracklistcontentComponent } from './tracklistcontent.component';

describe('TracklistcontentComponent', () => {
  let component: TracklistcontentComponent;
  let fixture: ComponentFixture<TracklistcontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TracklistcontentComponent]
    });
    fixture = TestBed.createComponent(TracklistcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
