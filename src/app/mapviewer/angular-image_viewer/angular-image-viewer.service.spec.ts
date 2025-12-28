import { TestBed } from '@angular/core/testing';

import { AngularImageViewerService } from './angular-image-viewer.service';

describe('AngularImageViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularImageViewerService = TestBed.inject(AngularImageViewerService);
    expect(service).toBeTruthy();
  });
});
