import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItWallComponent } from './post-it-wall.component';

describe('PostItWallComponent', () => {
  let component: PostItWallComponent;
  let fixture: ComponentFixture<PostItWallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostItWallComponent]
    });
    fixture = TestBed.createComponent(PostItWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
