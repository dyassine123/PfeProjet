import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTuteurComponent } from './register-tuteur.component';

describe('RegisterTuteurComponent', () => {
  let component: RegisterTuteurComponent;
  let fixture: ComponentFixture<RegisterTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTuteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
