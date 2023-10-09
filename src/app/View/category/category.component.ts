import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category = ["Tech1", "Tech2"]
  blogCategory = true;
  blogContents = false;
  blogPage = false;
  public like = false;
  public unlike = true;
  public viewCount = 100;
  formModel: any;

  constructor(private api: NetworkCallService, private storageService: TokenStorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.getCategory();
  }

  blogCategories() {
    this.blogCategory = true;
    this.blogContents = false;
  }
  blogCategoryContent() {
    this.blogCategory = false;
    this.blogContents = true;
  }
  blogpage() {
    this.blogCategory = false;
    this.blogContents = false;
    this.blogPage = true;
  }
  likeButton() {
    this.like = true;
    this.unlike = false;
  }
  unlikeButton() {
    this.like = false;
    this.unlike = true;
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
  getCategoryid(id: any) {
    this.storageService.setCategoryId(id);

  }

  getCategorybyName(name: any) {
    sessionStorage.setItem('CName', name)

  }
}
