import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { CategoryModel } from 'src/app/model/CategoryModel';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  data?: any;

  header = "How to Install Bootstrp in angular?"
  subHeader = "Carbon offsetting programmes offer motorists a chance to reduce emissions, but could they also be extending the use of crude oil and hindering EV adoption?"
  author = "Gokul"
  contentHead = "What is bootstrap?"
  content = "Bootstrap v5.3.1 is here with bug fixes, documentation improvements, and more follow-up enhancements for color modes. Keep reading for the highlights!!Color modes:Increased color contrast for dark mode by replacing $gray-500 with $gray-300 for the body color Added our color mode switcher JavaScript to our examples ZIP download Components:Improved disabled styling for all .nav-links, providing .disabled and :disabled for use with anchors and buttonsAdd support for Home and End keys for navigating tabs by keyboardAdded some basic styling to toggle buttons when no modifier class is present Fixed carousel colors in dark modeForms:"


  public like = false;
  public unlike = true;
  public viewCount = 100;
  categoryForm: FormGroup;
  deleteID = '';


  formModel: any = {
    id: '',
    blogCategoryName: '',
    categoryImage: '',
    totalBlogs: ''
  }
  categoryId: any;

  // categoryModel = {
  //   id:
  // }
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
      data: this.data,
      buttons: [
        { extend: 'excel', className: 'btn btn-success', text: 'Excel' },
        { extend: 'print', className: 'btn btn-info' }
      ]
    };

    this.categoryForm = new FormGroup({
      blogCategoryName: new FormControl('', Validators.required),
      categoryImage: new FormControl('', Validators.required)
    });

  }
  ngOnInit(): void {
    this.getCategory();

  }



  getCategory() {
    this.api.getCategory().subscribe({
      next: (data) => {
        this.formModel = data;

        console.log(data);
      },
      error: (error) => {

      }
    })
  }
  addCategory() {
    this.api.addCategory(this.categoryForm.value).subscribe({
      next: (data) => {
        this.data = data;
        window.alert("Added Succefull")

      },
      error: (error) => {
        window.alert("couldn't Add")
      }
    });
    this.getCategory();
  }
  updateCategory() {
    this.api.putCategoryById(this.formModel).subscribe({
      next: (data) => {
        this.data = data;
        window.alert("update Succefull")

      },
      error: (error) => {
        window.alert("couldn't update")
      }
    });
    this.getCategory();
  }

  deleteCategory() {

    this.api.deleteCategory(this.deleteID).subscribe({
      next: (data) => {
        window.alert("Delete Succefull")

      },
      error: (error) => {
        window.alert("couldn't delete")
      }
    });
    this.getCategory();
  }
  getId(id: any) {
    this.deleteID = id;
  }

  edit(data: any) {
    this.formModel = data;
  }

}
