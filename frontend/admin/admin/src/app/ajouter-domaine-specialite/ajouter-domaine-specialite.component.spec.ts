import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDomaineSpecialiteComponent } from './ajouter-domaine-specialite.component';

describe('AjouterDomaineSpecialiteComponent', () => {
  let component: AjouterDomaineSpecialiteComponent;
  let fixture: ComponentFixture<AjouterDomaineSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterDomaineSpecialiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterDomaineSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
