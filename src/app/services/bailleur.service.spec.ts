import { TestBed } from '@angular/core/testing';
import { BailleurService } from './bailleur.service';


describe('BailleurService', () => {
  let service: BailleurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BailleurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});