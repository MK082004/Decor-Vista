import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerDashbaordComponent } from './designer-dashbaord.component';

describe('DesignerDashbaordComponent', () => {
  let component: DesignerDashbaordComponent;
  let fixture: ComponentFixture<DesignerDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
