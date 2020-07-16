import { Component, OnInit } from '@angular/core';
import { ProductsModel } from '../products/products.model';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  title:String = "Add Products";
  constructor(private productService: ProductService, private router: Router) { }
  productItem = new ProductsModel(null,null,null,null,null,null,null,null);
  
  AddProducts()
  {
    this.productService.newProduct(this.productItem);
    console.log("Called");
    alert("Product inserted successfully");
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    
  }
}
