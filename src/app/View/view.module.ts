import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteViewModule, homepage } from './route-view.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeContentsComponent } from './home-contents/home-contents.component';
import { CategoryComponent } from './category/category.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HomePageComponent, HomeContentsComponent, CategoryComponent, homepage, BlogListComponent, BlogPageComponent, ContactPageComponent],
  imports: [
    CommonModule, BrowserAnimationsModule, RouteViewModule, MatCardModule, MatButtonModule,
    FlexLayoutModule, MatIconModule, MatMenuModule, MatCheckboxModule,
    MatRippleModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatListModule, MatToolbarModule, FontAwesomeModule
    , DataTablesModule, ReactiveFormsModule, MatSlideToggleModule, MatSnackBarModule
  ]
})
export class ViewModule {
  constructor(library: FaIconLibrary) {

  }
}
