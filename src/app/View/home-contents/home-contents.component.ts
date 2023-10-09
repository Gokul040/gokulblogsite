import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { categoryModel } from 'src/app/categoryModel';


@Component({
  selector: 'app-home-contents',
  templateUrl: './home-contents.component.html',
  styleUrls: ['./home-contents.component.css']
})
export class HomeContentsComponent implements OnInit {
  public like = false;
  public unlike = true;
  public viewCount = 100;

  category: any;
  categoryId: any;
  formModel: any;

  constructor(private api: NetworkCallService, private storageService: TokenStorageService, private router: Router) {

  }
  ngOnInit(): void {
    this.getCategory();
  }

  //   categorys: categoryModel[] = [{

  //     category:[{
  //       categoryName: "Tech1",
  //       contents: [
  //         {
  //           Name: "Angular",
  //           content: "Lewfewfewfew",
  //           like: true,
  //           view: 200
  //         },
  //         {
  //           categoryName: "Tech2",
  //           Name: "Bootstrap",
  //           content: "Lewfewfewfew",
  //           like: true,
  //           view: 300
  //         } 
  //     ]
  //   },
  //   categoryName: "Tech1",
  //   contents: [
  //     {
  //       Name: "Angular",
  //       content: "Lewfewfewfew",
  //       like: true,
  //       view: 200
  //     },
  //     {
  //       categoryName: "Tech2",
  //       Name: "Bootstrap",
  //       content: "Lewfewfewfew",
  //       like: true,
  //       view: 300
  //     } 
  // ]
  // ],
  // }]

  //     contents: {[
  //       {
  //         Name: "Angular",
  //         content: "Lewfewfewfew",
  //         like: true,
  //         view: 200
  //       },
  //       {
  //         categoryName: "Tech2",
  //         Name: "Bootstrap",
  //         content: "Lewfewfewfew",
  //         like: true,
  //         view: 300
  //       } 
  //   ]
  // },
  //   {

  //     contents: [
  //       {
  //         Name: "Angular",
  //         content: "Lewfewfewfew",
  //         like: true,
  //         view: 200
  //       },
  //       {
  //         Name: "Bootstrap",
  //         content: "Lewfewfewfew",
  //         like: true,
  //         view: 300
  //       },
  //     ]
  //   },

  //   ]


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
        this.category = data;

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

