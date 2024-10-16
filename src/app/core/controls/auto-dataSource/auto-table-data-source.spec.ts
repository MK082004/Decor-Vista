import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableDataSource } from './auto-table-data-source';

describe('TableDataSource', () => {
  let component: TableDataSource;
  let fixture: ComponentFixture<TableDataSource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDataSource ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataSource);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
