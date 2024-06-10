import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionCoursComponent } from './description-cours.component';

describe('DescriptionCoursComponent', () => {
  let component: DescriptionCoursComponent;
  let fixture: ComponentFixture<DescriptionCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
