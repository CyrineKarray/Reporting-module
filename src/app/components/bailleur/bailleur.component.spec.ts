import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BailleurComponent } from './bailleur.component';


describe('BailleurComponent', () => {
  let component: BailleurComponent;
  let fixture: ComponentFixture<BailleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BailleurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
