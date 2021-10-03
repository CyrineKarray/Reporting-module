import { TestBed } from '@angular/core/testing';
import { FinancementService } from './financement.service';


describe('FinancementService', () => {
  let service: FinancementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
