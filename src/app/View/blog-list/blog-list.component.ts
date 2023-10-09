import { Component, OnInit } from '@angular/core';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public like = false;
  public unlike = true;
  public viewCount = 100;
  formModel: any;
  categoryId: any;
  categoryName: any;

  constructor(private api: NetworkCallService, private storageService: TokenStorageService) { }
  ngOnInit(): void {
    this.getBlogList();
    this.categoryName = sessionStorage.getItem('CName')
  }

  likeButton() {
    this.like = true;
    this.unlike = false;
  }
  unlikeButton() {
    this.like = false;
    this.unlike = true;
  }


  getBlogList() {
    console.log(sessionStorage.getItem('categoryId'))
    this.categoryId = sessionStorage.getItem('categoryId')
    this.api.getBlogsByCategory(this.categoryId).subscribe({
      next: (data) => {
        this.formModel = data;

        console.log(data);
      },
      error: (error) => {

      }
    })
  }

  getBlogId(id: any) {
    this.storageService.setBlogId(id);
  }

}
