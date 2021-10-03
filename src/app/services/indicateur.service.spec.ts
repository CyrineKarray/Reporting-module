
import { TestBed } from '@angular/core/testing';
import { IndicateurService } from './indicateur.service';


describe('IndicateurService', () => {
  let service: IndicateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
