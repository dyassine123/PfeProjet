import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierEmailTuteurComponent } from './verifier-email-tuteur.component';

describe('VerifierEmailTuteurComponent', () => {
  let component: VerifierEmailTuteurComponent;
  let fixture: ComponentFixture<VerifierEmailTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifierEmailTuteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifierEmailTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
