import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogManagementComponent } from './admin-blog-management.component';

describe('AdminBlogManagementComponent', () => {
  let component: AdminBlogManagementComponent;
  let fixture: ComponentFixture<AdminBlogManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBlogManagementComponent]
    });
    fixture = TestBed.createComponent(AdminBlogManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
