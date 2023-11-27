import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartserviceService } from '../services/cartservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 

  Products: any;
  
  constructor(private http:HttpClient,private router:Router,private cartservice:CartserviceService){}

  ngOnInit():void{
    this.getProducts();
    
  }

  getProducts(){
    this.http.get('http://localhost:4200/assets/data/prods.json').subscribe((products)=>{
      this.Products = products;
      console.log(this.Products);
      this.Products = this.Products.map((a: any) => ({
        ...a,
        quantity: 1,
        total: a.price
      }));
    });
   
  }

  ToProdDet(type:string,id:string){
     this.router.navigate(['proddet',type,id]);
  }
  
  addtoCart(item:any){
    this.cartservice.addToCart(item);
   }
}
