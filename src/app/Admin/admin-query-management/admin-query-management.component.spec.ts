import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQueryManagementComponent } from './admin-query-management.component';

describe('AdminQueryManagementComponent', () => {
  let component: AdminQueryManagementComponent;
  let fixture: ComponentFixture<AdminQueryManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminQueryManagementComponent]
    });
    fixture = TestBed.createComponent(AdminQueryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
