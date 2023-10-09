import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  isThemeDark?: Observable<boolean>;
  isChecked = true;


  constructor(private themeService: ThemeService, private router: Router) { }

  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;
  }


  toggleDarkTheme(checked: any) {
    this.themeService.setDarkTheme(checked.checked);

    // console.log("checked >", this.isThemeDark);
    console.log("checked >", checked.checked);
    if (checked.checked === true) {
      this.isChecked = false;
    }
    else {
      this.isChecked = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('home/homeContent');
  }
}
