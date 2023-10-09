import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NetworkCallService } from 'src/app/Services/NetworkCall.service';
import { BlogModel } from 'src/app/model/BlogModel';
import { CategoryModel } from 'src/app/model/CategoryModel';

@Component({
  selector: 'app-admin-blog-management',
  templateUrl: './admin-blog-management.component.html',
  styleUrls: ['./admin-blog-management.component.css']
})
export class AdminBlogManagementComponent implements OnInit {

  datas: any;
  imageFile!: File;
  imageByteData = '';
  categories?: any;

  public like = false;
  public unlike = true;
  public viewCount = 100;
  AddBlogForm: FormGroup;
  deleteID = '';
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

    this.AddBlogForm = new FormGroup({

      blogTitle: new FormControl('', Validators.required),
      authorEmail: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      blogImage1: new FormControl(''),
      blogImage2: new FormControl(''),
      blogImage3: new FormControl(''),
      subTopic1: new FormControl(''),
      subTopic2: new FormControl(''),
      st1Paragraph1: new FormControl(''),
      st1Paragraph2: new FormControl(''),
      st1Paragraph3: new FormControl(''),
      st2Paragraph4: new FormControl(''),
      st2Paragraph5: new FormControl(''),
      st2Paragraph6: new FormControl(''),

    });

  }

  addForm = {
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
  editForm: any = {
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
  categoryList: any;
  blogDatas: any;


  ngOnInit(): void {
    this.getBlog();
    this.getCategory();
    this.dtOptions
  }

  categoryForm: any = {
    id: '',
    blogCategoryName: '',
    categoryImage: '',
    totalBlogs: ''
  }


  categoryId: any;

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
        this.categoryList = data;


      },
      error: (error) => {

      }
    })
  }

  getBlog() {
    this.api.getAllBlogs().subscribe({
      next: (data) => {
        this.blogDatas = data;


      },
      error: (error) => {

      }
    })
  }


  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageByteData = reader.result as any;
    };
    reader.readAsArrayBuffer(this.imageFile);
  }

  addBlog() {

    this.api.addBlog(this.addForm).subscribe({
      next: (data) => {
        window.alert("Added Succefull")

      },
      error: (error) => {
        window.alert("couldn't Add")
      }
    });

    console.log(this.addForm)
  }


  updateCategory() {
    this.api.putCategoryById(this.categoryForm).subscribe({
      next: (data) => {
        this.datas = data;
        window.alert("update Succefull")

      },
      error: (error) => {
        window.alert("couldn't update")
      }
    });
    this.getBlog();
  }

  getBlogData(data: any) {
    this.editForm = data;
  }
  editBlog() {
    this.api.putBlog(this.editForm).subscribe({
      next: (data) => {
        this.datas = data;
        window.alert("update Succefull")

      },
      error: (error) => {
        window.alert("couldn't update")
      }
    });
    this.getBlog();
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
    this.getBlog();
  }
  getId(id: any) {
    this.deleteID = id;
  }

  edit(data: any) {
    this.categoryForm = data;
  }

  blogView(id: any) {
    this.api.getBlogById(id).subscribe({
      next: (data) => {
        this.viewData = data;

      },
      error: (error) => {

      }
    })
  }
  deleteBlog() {
    this.api.deleteBlog(this.deleteID).subscribe({
      next: (data) => {
        window.alert("Delete Succefull")

      },
      error: (error) => {
        window.alert("Delete Un Succefull")
      }
    })
    this.getBlog();
  }

}

