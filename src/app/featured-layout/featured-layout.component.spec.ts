import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedLayoutComponent } from './featured-layout.component';

describe('FeaturedLayoutComponent', () => {
  let component: FeaturedLayoutComponent;
  let fixture: ComponentFixture<FeaturedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
