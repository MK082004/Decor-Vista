import { TestBed } from '@angular/core/testing';
import { CanDeactivateGuard } from './can-deactivate-guard.guard';

describe('CanDeactivateGuardGuard', () => {
  let guard: CanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
