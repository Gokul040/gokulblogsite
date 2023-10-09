import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeContentsComponent } from './home-contents/home-contents.component';
import { CategoryComponent } from './category/category.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/homeContent', pathMatch: 'full' },
  {
    path: 'home', component: HomePageComponent, children:
      [{
        path: 'homeContent',
        component: HomeContentsComponent,
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'bloglist', component: BlogListComponent
      },
      {
        path: 'blogpage', component: BlogPageComponent
      },
      {
        path: 'contact', component: ContactPageComponent
      },

      ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteViewModule { }
export const homepage = [HomePageComponent, HomeContentsComponent, CategoryComponent, BlogListComponent, BlogPageComponent, ContactPageComponent]