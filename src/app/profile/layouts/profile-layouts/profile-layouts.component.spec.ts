import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLayoutsComponent } from './profile-layouts.component';

describe('ProfileLayoutsComponent', () => {
  let component: ProfileLayoutsComponent;
  let fixture: ComponentFixture<ProfileLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLayoutsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
