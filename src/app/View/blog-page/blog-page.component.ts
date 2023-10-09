import { Component, OnInit } from '@angular/core';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blogId: any;
  categoryId: any;
  blogListData: any;
 
  ngOnInit(): void {
    this.getBlog();
  }

  constructor(private api: NetworkCallService, private serviceStorage: TokenStorageService) { }

  viewData: any = {
    blogTitle: '',
    authorEmail: '',
    category: {
      blogCategoryName: '',
    },
    blogImage1: '',
    blogImage2: '',
    blogImage3: '',
    subTopic1: '',
    subTopic2: '',
    st1Paragraph1: '',
    st1Paragraph2: '',
    st1Paragraph3: '',
    st2Paragraph4: '',
    st2Paragraph5: '',
    st2Paragraph6: '',

  }
  getBlog() {
    this.blogId = sessionStorage.getItem('blogId')
    this.api.getBlogById(this.blogId).subscribe({
      next: (data) => {
        this.viewData = data;

        console.log(data);
      },
      error: (error) => {

      }
    })
  }
  getBlogList() {
    this.categoryId = sessionStorage.getItem('categoryId')
    this.api.getBlogsByCategory(this.categoryId).subscribe({
      next: (data) => {
        this.blogListData = data;

        console.log(data);
      },
      error: (error) => {

      }
    })
  }
  


}
