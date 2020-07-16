import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductsModel } from './products/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _productsUrl = "http://localhost:3000/api/products";
  private _productInsertUrl = "http://localhost:3000/api/insert";
  private _productUpdateUrl = "http://localhost:3000/api/edit";

  private product: ProductsModel
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(this._productsUrl)
  }

  newProduct(item){
    return this.http.post(this._productInsertUrl,{"product":item})
    .subscribe(data => {console.log(data)})
  }

  updateProduct(item){
    return this.http.post(this._productUpdateUrl,{"product":item})
    .subscribe(data => {console.log(data)})
  }
  setter(product){
    console.log("Setter function called")
    this.product=product;
    console.log(product);
  }
  test(){
    return this.product;
  }

  deleteProduct(uid:string){
    return this.http.delete(`http://localhost:3000/api/delete/${uid}`)
  }
}
