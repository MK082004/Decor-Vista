import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesLogComponent } from './categories-log.component';

describe('CategoriesLogComponent', () => {
  let component: CategoriesLogComponent;
  let fixture: ComponentFixture<CategoriesLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
