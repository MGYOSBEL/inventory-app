import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSearchComponentComponent } from './youtube-search-component.component';

describe('YoutubeSearchComponentComponent', () => {
  let component: YoutubeSearchComponentComponent;
  let fixture: ComponentFixture<YoutubeSearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeSearchComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
