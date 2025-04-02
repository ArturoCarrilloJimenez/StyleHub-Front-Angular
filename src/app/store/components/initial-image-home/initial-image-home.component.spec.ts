import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialImageHomeComponent } from './initial-image-home.component';

describe('InitialImageHomeComponent', () => {
  let component: InitialImageHomeComponent;
  let fixture: ComponentFixture<InitialImageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialImageHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialImageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
