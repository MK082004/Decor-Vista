import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoaderProgressBarComponent } from './app-loader-progress-bar/app-loader-progress-bar.component';

describe('AppLoaderProgressBarComponent', () => {
  let component: AppLoaderProgressBarComponent;
  let fixture: ComponentFixture<AppLoaderProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLoaderProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoaderProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
