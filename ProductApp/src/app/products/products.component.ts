import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductsModel } from './products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  title:String = "Product List";

  // product is the model class for a product item
  products: ProductsModel[];
  // image properties
  imageWidth: number = 55;
  imageMargin: number = 2;
  showImage: boolean = false;
  // creating service object for calling getProducts()
  constructor(private productService:ProductService, private router: Router) { }
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
   ngOnInit(): void {
    // calling getProducts() and loading the products to products array
    this.productService.getProducts()
    .subscribe((data)=>{
      this.products = JSON.parse(JSON.stringify(data));
    })
  }

  edit(product){
    this.productService.setter(product);
     console.log('Edit function called');
     this.router.navigate(['/edit']);
  }

  onDelete(uid:string):void{
    let makeSure:boolean=confirm('Are you sure You want to Delete This Product?');
    if(makeSure){
      this.productService.deleteProduct(uid)
      .subscribe((response:{uid})=>{
        console.log(`product with id ${response.uid} deleted successfully `);
        location.reload();
        });
    }
  }
}
