import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteGenericComponent } from './auto-complete-generic.component';

describe('AutoCompleteGenericComponent', () => {
  let component: AutoCompleteGenericComponent;
  let fixture: ComponentFixture<AutoCompleteGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCompleteGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
