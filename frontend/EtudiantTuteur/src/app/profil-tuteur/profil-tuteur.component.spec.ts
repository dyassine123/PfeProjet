import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilTuteurComponent } from './profil-tuteur.component';

describe('ProfilTuteurComponent', () => {
  let component: ProfilTuteurComponent;
  let fixture: ComponentFixture<ProfilTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilTuteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
