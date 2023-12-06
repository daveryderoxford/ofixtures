import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostcodeComponent } from './postcode.component';

describe('PostcodeComponent', () => {
  let component: PostcodeComponent;
  let fixture: ComponentFixture<PostcodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [PostcodeComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
