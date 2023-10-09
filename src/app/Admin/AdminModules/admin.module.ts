import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteAdminModule, admincomponents } from './route-admin.module';
import { AdminDashBoardComponent } from '../admin-dash-board/admin-dash-board.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AdminQueryManagementComponent } from '../admin-query-management/admin-query-management.component';
import { AdminUserManagementComponent } from '../admin-user-management/admin-user-management.component';
import { AdminBlogManagementComponent } from '../admin-blog-management/admin-blog-management.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminCategoryComponent } from 'src/app/Admin/admin-category/admin-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [AdminDashBoardComponent, AdminCategoryComponent, AdminHomeComponent, AdminQueryManagementComponent, AdminUserManagementComponent, AdminBlogManagementComponent, admincomponents],
  imports: [
    CommonModule, BrowserAnimationsModule, RouteAdminModule, DataTablesModule, HttpClientModule, MatCardModule, MatButtonModule,
    MatMenuModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatListModule, MatToolbarModule, MatSlideToggleModule, ReactiveFormsModule, FormsModule, MatSelectModule
  ]
})
export class AdminModule { }
