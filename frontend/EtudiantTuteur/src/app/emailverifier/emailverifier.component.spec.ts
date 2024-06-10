import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailverifierComponent } from './emailverifier.component';

describe('EmailverifierComponent', () => {
  let component: EmailverifierComponent;
  let fixture: ComponentFixture<EmailverifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailverifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailverifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
