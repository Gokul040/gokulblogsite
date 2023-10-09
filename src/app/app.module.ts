import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminModule } from './Admin/AdminModules/admin.module';
import { RouteAdminModule } from './Admin/AdminModules/route-admin.module';
import { RouteViewModule } from './View/route-view.module';
import { ViewModule } from './View/view.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminCategoryComponent } from './Admin/admin-category/admin-category.component';
import { httpInterceptorProviders } from './security/JwtInterceptor';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    ScrollToTopComponent,

  ],
  imports: [
    BrowserModule, AdminModule, RouteAdminModule, RouteViewModule, MatCardModule, ViewModule,
    FlexLayoutModule, MatIconModule, MatMenuModule, MatButtonModule,
    MatRippleModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatListModule, MatToolbarModule, FontAwesomeModule
    , MatCheckboxModule, DataTablesModule, HttpClientModule, ReactiveFormsModule, MatSnackBarModule, FormsModule, MatSelectModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {

  }
}
