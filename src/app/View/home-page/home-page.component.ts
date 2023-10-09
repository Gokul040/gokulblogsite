import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { ThemeService } from 'src/app/Services/theme.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { genSaltSync, hashSync } from 'bcryptjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  category: any;
  isChecked = true;
  LoginName = 'Sign In'
  SignUpName = 'Sign Up'

  searchText = '';
  results = [];
  webPageContents: any;
  signIn = true;
  signUp = false;
  fEmail = false;
  fOtp = false;
  fhideSignIn = true;
  errorSignIN = false;


  isThemeDark?: Observable<boolean>;
  windowScrolled?: boolean;
  forgorError?: boolean = false;

  userImage?: any;

  userName = window.sessionStorage.getItem('userName');


  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;
    this.signInForms();
    this.forgotForms();
    this.LoginStatus();
    this.pI();
    this.getCategory();
  }
  pI() {
    this.userImage = sessionStorage.getItem('profileImage');
  }
  LoginStatus() {
    this.profileLogin = !!window.sessionStorage.getItem('userRole');
    if (this.profileLogin) {
      const userRole = window.sessionStorage.getItem('userRole')
      if (userRole?.includes('ADMIN') || userRole?.includes('USER')) {
        this.profileLogin = true;
        this.profileNotLogin = false;
      } else {
        this.profileLogin = false;
        this.profileNotLogin = true;
      }
    }
  }

  search() {
    this.results = this.webPageContents.filter((text: string) => text.match(this.searchText));
  }

  signUpComponent() {
    this.signIn = false;
    this.signUp = true;
  }
  signInComponent() {
    this.signIn = true;
    this.signUp = false;
  }
  fPassword() {
    this.fhideSignIn = false;
    this.fEmail = true;
  }

  goToOtp() {
    this.fEmail = false;
    this.fOtp = true;
  }
  redirectSignIn() {
    this.fEmail = false;
    this.fOtp = false;
    this.fhideSignIn = true;
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

  public loginValid = true;
  passwordform: FormGroup;
  signInForm!: FormGroup;
  forgotForm!: FormGroup;
  confirmForm!: FormGroup;
  signUpForm!: FormGroup;
  durationInSeconds = 5;
  newPassword!: string;
  profileNotLogin: boolean = true;
  profileLogin: boolean = false;

  token!: string;
  userRole?: string;
  private URLRegisteration: string = '';
  spinner: boolean = false;
  expiryDate?: Date | any;

  onSubmit() { }

  error_messages = {

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Enter Minimum 8 Characters.' },
      { type: 'maxlength', message: 'Enter below 16 characters.' }
    ],
    'newPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Enter Minimum 8 Characters.' },
      { type: 'maxlength', message: 'Enter below 16 characters.' }
    ],
  }

  constructor(
    public formbuilder: FormBuilder, private api: NetworkCallService, private router: Router,
    private _snackBar: MatSnackBar, private tokenStorage: TokenStorageService, @Inject(DOCUMENT) private document: Document, private themeService: ThemeService) {


    this.passwordform = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      otp: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
    }, { validators: this.Mustmatch('password', 'newPassword') }
    )
  }


  signInForms() {
    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  forgotForms() {
    this.forgotForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  signUpForms() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  Mustmatch(pass: any, conpass: any) {
    return (formGroup: FormGroup) => {
      const passctrl = formGroup.controls['password'];
      const conpassctrl = formGroup.controls['newPassword'];

      if (conpassctrl.errors && !conpassctrl.errors['Mustmatch']) {
        return;
      }
      if (passctrl.value !== conpassctrl.value) {
        conpassctrl.setErrors({ Mustmatch: true });
      } else {
        conpassctrl.setErrors(null);
      }
    }
  }

  get f() {
    return this.passwordform.controls;
  }

  hashPassword(password: string) {
    const salt = genSaltSync();
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }



  updateLogin() {

    if (this.signInForm.valid) {
      // this.signInForm.value.password = this.hashPassword(this.signInForm.value.password);
      // console.log(this.signInForm.value.password)
      this.spinner = true;
      this.api.postLogin(this.signInForm.value).subscribe(

        {
          next: (LoginData) => {
            const token = LoginData.token;
            const email = LoginData.email;
            const userRole = LoginData.role;
            this.expiryDate = LoginData.expiryDate;
            this.userImage = LoginData.profileImage;

            sessionStorage.setItem('userName', LoginData.userName);
            this.userName = window.sessionStorage.getItem('userName');
            console.log(this.userImage)
            window.sessionStorage.setItem('profileImage', LoginData.profileImage);
            this.tokenStorage.saveTokens(LoginData);
            this.tokenStorage.saveEmail(email);
            window.sessionStorage.setItem('userRole', userRole);
            window.sessionStorage.setItem('Expirydate', this.expiryDate)
            console.log(LoginData)
            this.api._isLoggedIn$.next(true);
            this.router.navigate(['home/homeContent']);
            this.spinner = false;
            window.location.reload();
            this.LoginStatus();
          },
          error: (error) => {
            this.errorSignIN = true;
            this.spinner = false;
          }
        });
    }

  } reloadPage() {
    window.location.reload();
  };


  forgotPassword() {
    this.spinner = true;

    if (this.forgotForm.valid) {
      this.api.postPassword(this.forgotForm.value).subscribe(
        forgotData => {
          this.spinner = false;
          console.log(forgotData)
          this.goToOtp();
        },
        error => {
          window.alert("User Name not found")
          this.forgorError = true;
          this.spinner = false;
        }
      );
    }
  }

  confirmPass() {
    this.passwordform.value.password = this.hashPassword(this.passwordform.value.password)
    if (this.passwordform.valid) {
      this.api.confirmPassword(this.passwordform.value).subscribe(
        confirmData => {
          window.alert("Your password reset Successfully")
          this.redirectSignIn()
        },
        error => {
          window.alert("Otp Expired or Enter Correct Email")
        }
      );
    }
  }




  logout() {
    sessionStorage.clear();
  }

  getCategory() {
    this.api.getCategory().subscribe({
      next: (data) => {
        this.category = data;

        console.log(data);
      },
      error: (error) => {

      }
    })
  }

}


