import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../model/CategoryModel';
import { UserModel } from '../model/UserModel';
import { ApiResponse } from '../model/ApiResponse';
import { TokenStorageService } from './token-storage.service';
import { BlogModel } from '../model/BlogModel';


@Injectable({
  providedIn: 'root'
})
export class NetworkCallService {

  private URLRegisteration = "http://localhost:8080"


  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(public httpClient: HttpClient, private inject: Injector) { }

  storage = this.inject.get(TokenStorageService)
  getToken() {
    const jwtToken = window.sessionStorage.getItem('token');
    return jwtToken;
  }

  postLogin(data: any): Observable<any> {
    return this.httpClient.post(`${this.URLRegisteration}/authenticate`, data,
    );
  }

  // category
  getCategory(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(`${this.URLRegisteration}/category/get-all-Category`);
  }
  getCategoryAll() {
    return this.httpClient.get(`${this.URLRegisteration}/category/get-all-Category`);
  }
  getCategoryById(data: string): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(`${this.URLRegisteration}/category/get-one-Category/` + data);
  }
  // getcategoryDetailsByAssetLocationId(data: number): Observable<CategoryModel> {
  //   return this.httpClient.get<CategoryModel>(`${this.URLRegisteration}/category/get-one-category-assetLocation/` + data);
  // }
  putCategoryById(data: any): Observable<Object> {
    return this.httpClient.put<Object>(`${this.URLRegisteration}/category/update-Category-by-id`, data, { responseType: 'text' as 'json' });
  }
  putCategoryByName(data: any): Observable<Object> {
    return this.httpClient.put<Object>(`${this.URLRegisteration}/category/update-Category-by-name`, data, { responseType: 'text' as 'json' });
  }
  addCategory(data: any): Observable<Object> {
    return this.httpClient.post<Object>(`${this.URLRegisteration}/category/newCategory`, data, { responseType: 'text' as 'json' });
  }
  deleteCategory(id: any): Observable<CategoryModel> {
    return this.httpClient.delete<CategoryModel>(`${this.URLRegisteration}/category/delete-Category/` + id, { responseType: 'text' as 'json' });
  }


  // Blog
  getBlogsByCategory(data: any) {
    return this.httpClient.get(`${this.URLRegisteration}/blog/get-blogs-category/` + data);
  }



  getAssetDetailsById(data: number): Observable<BlogModel> {
    return this.httpClient.get<BlogModel>(`${this.URLRegisteration}/asset-details/get-one-asset-details/` + data);
  }
  getAllBlogs() {
    return this.httpClient.get(`${this.URLRegisteration}/blog/get-all-blog`);
  }


  getAssetDetails() {
    return this.httpClient.get(`${this.URLRegisteration}/asset-details/get-all-asset-details`);
  }
  addBlog(data: any): Observable<Object> {
    return this.httpClient.post<Object>(`${this.URLRegisteration}/blog/newBlog`, data);
  }




  // User
  putUserPassword(data: any, email: string): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.URLRegisteration}/update-profile/` + email, data, { responseType: 'text' as 'json' });
  }

  postPassword(data: any): Observable<any> {
    return this.httpClient.post(`${this.URLRegisteration}/register/forgotpassword`, data, { responseType: 'text' as 'json' });
  }
  confirmPassword(data: any): Observable<any> {
    return this.httpClient.put(`${this.URLRegisteration}/register/verify-account`, data, { responseType: 'text' as 'json' })
  }
  putUserImage(id: number, img: string) {
    return this.httpClient.put(`${this.URLRegisteration}/register/update-image/` + id + '/' + img, { responseType: 'text' as 'json' })
  }

  GenerateRefreshToken() {
    let input = {
      "jwtToken": this.storage.getToken(),
      "refreshToken": this.storage.getRefreshToken()
    }
    return this.httpClient.post(`${this.URLRegisteration}/authenticate/refreshtoken`, input, { responseType: 'text' as 'json' });
  }

  getProfileUser(userName: any): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.URLRegisteration}/register/get-user/` + userName);
  }
  putPasswordProfileUser(data: any): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.URLRegisteration}/register/update-profile`, data, { responseType: 'text' as 'json' });
  }

  postUser(data: UserModel): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.URLRegisteration}/register/newuser`, data, { responseType: 'text' as 'json' });
  }
  getUser() {
    return this.httpClient.get<any>(`${this.URLRegisteration}/register/get-user`);
  }

  putUser(data: any) {
    return this.httpClient.put<any>(`${this.URLRegisteration}/register/update-user`, data, { responseType: 'text' as 'json' });
  }

  deleteUser(id: number) {
    return this.httpClient.delete<any>(`${this.URLRegisteration}/register/delete-user/` + id, { responseType: 'text' as 'json' });
  }

  //Blog API
  getBlogById(id: any) {
    return this.httpClient.get<any>(`${this.URLRegisteration}/blog/get-one-blog/` + id);
  }
  putBlog(data: any) {
    return this.httpClient.put<any>(`${this.URLRegisteration}/blog/update-blog`, data, { responseType: 'text' as 'json' });
  }

  deleteBlog(id: any) {
    return this.httpClient.delete<any>(`${this.URLRegisteration}/blog/delete-blog/` + id, { responseType: 'text' as 'json' });
  }

  postBlog(data: any): Observable<BlogModel> {
    return this.httpClient.post<BlogModel>(`${this.URLRegisteration}/blog/newBlog`, data, { responseType: 'text' as 'json' });
  }
}
