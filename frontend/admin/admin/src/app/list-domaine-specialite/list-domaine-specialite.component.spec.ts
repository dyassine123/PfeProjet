import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDomaineSpecialiteComponent } from './list-domaine-specialite.component';

describe('ListDomaineSpecialiteComponent', () => {
  let component: ListDomaineSpecialiteComponent;
  let fixture: ComponentFixture<ListDomaineSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDomaineSpecialiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDomaineSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
