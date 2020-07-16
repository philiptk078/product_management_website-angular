import { Component, OnInit } from '@angular/core';
import { ProductsModel } from '../products/products.model';
import { ProductService } from '../product.service';
// import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title:String = "Update Products";
  productItem = new ProductsModel(null,null,null,null,null,null,null,null);

  constructor(private productService: ProductService, private router: Router) { }
  
  ngOnInit(): void {
    this.productItem = this.productService.test();
  }

  updateProduct(){
    this.productService.updateProduct(this.productItem);
    console.log("Product updated with product name is " + this.productItem.productName);
    alert("Product updated successfully");
    this.router.navigate(['/']);
  }

}
