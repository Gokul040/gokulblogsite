import { NgModule } from '@angular/core';
import { AdminDashBoardComponent } from '../admin-dash-board/admin-dash-board.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AdminBlogManagementComponent } from '../admin-blog-management/admin-blog-management.component';
import { AdminQueryManagementComponent } from '../admin-query-management/admin-query-management.component';
import { AdminUserManagementComponent } from '../admin-user-management/admin-user-management.component';
import { authGuard } from 'src/app/security/auth.guard';
import { HasRoleGuardGuard } from 'src/app/security/has-role-guard.guard';
import { AdminCategoryComponent } from 'src/app/Admin/admin-category/admin-category.component';



const routes: Routes = [
  {
    path: 'adminHome', component: AdminHomeComponent, children: [
      {
        path: 'adminDashboard', component: AdminDashBoardComponent,
        canActivate: [authGuard, HasRoleGuardGuard],
        data: {
          role: ['ADMIN']
        }
      },
      {
        path: 'adminBlog', component: AdminBlogManagementComponent,
        canActivate: [authGuard, HasRoleGuardGuard],
        data: {
          role: ['ADMIN']
        }
      },
      {
        path: 'adminQuery', component: AdminQueryManagementComponent,
        canActivate: [authGuard, HasRoleGuardGuard],
        data: {
          role: ['ADMIN']
        }
      },
      {
        path: 'adminUser', component: AdminUserManagementComponent,
        canActivate: [authGuard, HasRoleGuardGuard],
        data: {
          role: ['ADMIN']
        }
      },
      {
        path: 'adminCategory', component: AdminCategoryComponent,
        canActivate: [authGuard, HasRoleGuardGuard],
        data: {
          role: ['ADMIN']
        }
      },

    ],
    canActivate: [authGuard, HasRoleGuardGuard],
    data: {
      role: ['ADMIN']
    }
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteAdminModule { }
export const admincomponents = [AdminDashBoardComponent, AdminHomeComponent, AdminQueryManagementComponent, AdminUserManagementComponent, AdminBlogManagementComponent,]