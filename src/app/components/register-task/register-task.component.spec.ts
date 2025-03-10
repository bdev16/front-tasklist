import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTaskComponent } from './register-task.component';

describe('RegisterTaskComponent', () => {
  let component: RegisterTaskComponent;
  let fixture: ComponentFixture<RegisterTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
