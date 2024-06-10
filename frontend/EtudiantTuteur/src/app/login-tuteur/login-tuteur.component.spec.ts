import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTuteurComponent } from './login-tuteur.component';

describe('LoginTuteurComponent', () => {
  let component: LoginTuteurComponent;
  let fixture: ComponentFixture<LoginTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTuteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
