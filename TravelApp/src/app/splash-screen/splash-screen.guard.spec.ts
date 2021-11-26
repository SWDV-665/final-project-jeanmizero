import { TestBed } from '@angular/core/testing';

import { SplashScreenGuard } from './splash-screen.guard';

describe('SplashScreenGuard', () => {
  let guard: SplashScreenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SplashScreenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
