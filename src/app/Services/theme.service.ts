import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  white: string = '#ffffff';
  black: string = '#141313';
  card_hover_dark: string = '#ffffff';
  card_hover_light: string = '#48615f';
  card_bgcolor: string = "#f0eeee";
  card_bgcolor_light: string = "#6a6a6a";


  private _themeDark: Subject<boolean> = new Subject<boolean>();

  isThemeDark = this._themeDark.asObservable();

  constructor() { }

  setDarkTheme(isThemeDark: boolean) {
    this._themeDark.next(isThemeDark);

    if (isThemeDark == true) {

      document.documentElement.style.removeProperty('--primary'),
        document.documentElement.style.removeProperty('--secondary');
      document.documentElement.style.removeProperty('card_hover');
      document.documentElement.style.removeProperty('--card_bgcolor');
      document.documentElement.style.removeProperty('--bs-dark-rgb');
      document.documentElement.style.setProperty('--primary', this.black);
      document.documentElement.style.setProperty('--secondary', this.white,);
      document.documentElement.style.setProperty('--card_hover', this.card_hover_dark);
      document.documentElement.style.setProperty('--card_bgcolor', this.card_bgcolor);
      // document.documentElement.style.setProperty('--bs-dark-rgb', this.black);


      localStorage.setItem('dark', 'true');
    }
    else {


      document.documentElement.style.removeProperty('--primary'),
        document.documentElement.style.removeProperty('--secondary');
      document.documentElement.style.removeProperty('--card_hover');
      document.documentElement.style.removeProperty('--card_bgcolor');
      document.documentElement.style.removeProperty('--bs-dark-rgb');
      document.documentElement.style.setProperty('--primary', this.white);
      document.documentElement.style.setProperty('--secondary', this.black);
      document.documentElement.style.setProperty('--card_hover', this.card_hover_light);
      document.documentElement.style.setProperty('--card_bgcolor', this.card_bgcolor_light);
      // document.documentElement.style.setProperty('--bs-dark-rgb', this.white);
      localStorage.setItem('dark', 'false');
    }
  }
}
