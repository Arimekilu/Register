import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtputComponent } from './create-otput.component';

describe('CreateOtputComponent', () => {
  let component: CreateOtputComponent;
  let fixture: ComponentFixture<CreateOtputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOtputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
