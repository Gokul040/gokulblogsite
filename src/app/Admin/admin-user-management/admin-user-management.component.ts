import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UserModel } from 'src/app/model/UserModel';


@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent {
  data: any;



  header = "How to Install Bootstrp in angular?"
  subHeader = "Carbon offsetting programmes offer motorists a chance to reduce emissions, but could they also be extending the use of crude oil and hindering EV adoption?"
  author = "Gokul"
  contentHead = "What is bootstrap?"
  content = "Bootstrap v5.3.1 is here with bug fixes, documentation improvements, and more follow-up enhancements for color modes. Keep reading for the highlights!!Color modes:Increased color contrast for dark mode by replacing $gray-500 with $gray-300 for the body color Added our color mode switcher JavaScript to our examples ZIP download Components:Improved disabled styling for all .nav-links, providing .disabled and :disabled for use with anchors and buttonsAdd support for Home and End keys for navigating tabs by keyboardAdded some basic styling to toggle buttons when no modifier class is present Fixed carousel colors in dark modeForms:"


  public like = false;
  public unlike = true;
  public viewCount = 100;
  userForm: FormGroup;
  deleteID: any;
  role = ['ADMIN', 'USER'];
  userAddForm: FormGroup;


  likeButton() {
    this.like = true;
    this.unlike = false;
  }
  unlikeButton() {
    this.like = false;
    this.unlike = true;
  }

  dtOptions: any = {};
  constructor(private api: NetworkCallService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        { extend: 'excel', className: 'btn btn-success', text: 'Excel' },
        { extend: 'print', className: 'btn btn-info' }
      ]
    };

    this.userAddForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      profileImage: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      profileImage: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }


  userUpdateForm: any = {
    contact: '',
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    id: '',
    enabled: '',
    profileImage: '',

  }

  ngOnInit(): void {
    this.getUser();
  }



  getUser() {
    this.api.getUser().subscribe({
      next: (data) => {
        this.data = data;
        console.log(data);
      },
      error: (error) => {

      }
    })
  }
  hashPassword(password: string) {
    const salt = genSaltSync();
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }
  addUser() {
    this.userAddForm.value.password = this.hashPassword(this.userAddForm.value.password)
    this.api.postUser(this.userAddForm.value).subscribe({
      next: (data) => {
        this.data = data;
        window.alert("Added Succefull - Verify your EMail within 5 Minutes")
        this.getUser();
      },
      error: (error) => {
        window.alert("couldn't Add")
        this.getUser();
      }
    });

  }
  updateUser() {
    console.log(this.userUpdateForm)
    this.userUpdateForm.password = this.hashPassword(this.userUpdateForm.password);
    this.api.putUser(this.userUpdateForm).subscribe({
      next: (data) => {
        this.data = data;
        window.alert("update Succefull")
        this.getUser();
      },
      error: (error) => {
        window.alert("couldn't update")
        this.getUser();
      }

    });
    this.getUser();
  }

  deleteUser() {

    this.api.deleteUser(this.deleteID).subscribe({
      next: (data) => {
        window.alert("Delete Succefull")
        this.getUser();

      },
      error: (error) => {
        window.alert("couldn't delete")
        this.getUser();
      }
    });
    this.getUser();
  }
  getId(id: any) {
    this.deleteID = id;
  }

  edit(data: any) {
    this.userUpdateForm = data;
  }



}


