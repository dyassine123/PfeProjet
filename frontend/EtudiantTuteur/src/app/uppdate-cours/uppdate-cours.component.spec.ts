import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UppdateCoursComponent } from './uppdate-cours.component';

describe('UppdateCoursComponent', () => {
  let component: UppdateCoursComponent;
  let fixture: ComponentFixture<UppdateCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UppdateCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UppdateCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
