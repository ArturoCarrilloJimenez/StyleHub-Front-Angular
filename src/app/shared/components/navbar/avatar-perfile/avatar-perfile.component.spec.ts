import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPerfileComponent } from './avatar-perfile.component';

describe('AvatarPerfileComponent', () => {
  let component: AvatarPerfileComponent;
  let fixture: ComponentFixture<AvatarPerfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarPerfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarPerfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
