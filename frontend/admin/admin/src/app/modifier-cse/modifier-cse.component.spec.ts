import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCSEComponent } from './modifier-cse.component';

describe('ModifierCSEComponent', () => {
  let component: ModifierCSEComponent;
  let fixture: ComponentFixture<ModifierCSEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCSEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
