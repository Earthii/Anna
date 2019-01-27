import { WasteWizardService } from './waste-wizard.service';
import { TestBed } from '@angular/core/testing';

describe('WatsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WatsonService = TestBed.get(WasteWizardService);
    expect(service).toBeTruthy();
  });
});
