import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

   cartDataList:any=[];
   productList=new BehaviorSubject<any>([])
  constructor(private http:HttpClient) {
    this.loadCartData();
   }
   
   getProductData() {
    return this.productList; // Return BehaviorSubject directly
  }

  setProduct(product:any){
    this.cartDataList.push(...product);
    this.productList.next(product)
  }

  addToCart(product:any){
    this.cartDataList.push(product);
    this.saveCartData();
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
    console.log(this.cartDataList)
  }

  getTotalAmount(){
    let grandTotal=0;
    this.cartDataList.map((a:any)=>{
      grandTotal+=a.total;
    })
  }

  removeCartData(product: any) {
    console.log('Before removal:', this.cartDataList);
  
    this.cartDataList = this.cartDataList.filter((a: any) => a.id !== product.id);
  
    console.log('After removal:', this.cartDataList);
  
    this.saveCartData();
    this.productList.next(this.cartDataList);
  }

  removeAllCart(){
    this.cartDataList= [];
    this.saveCartData();
    this.productList.next(this.cartDataList)
  }
  
  getCartItems() {
    return this.cartDataList;
  }


  private saveCartData() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartDataList));
  }

 
  private loadCartData() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartDataList = JSON.parse(storedItems);
      this.productList.next(this.cartDataList);
    }
  }
}
