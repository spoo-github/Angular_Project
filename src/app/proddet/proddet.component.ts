import { Component,Input,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartserviceService } from '../services/cartservice.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proddet',
  templateUrl: './proddet.component.html',
  styleUrls: ['./proddet.component.css']
})
export class ProddetComponent {
  

  type = '';
  id = '';
  url = '';
  products:any;
  product: any;
  comments: string[] = [];
  newComment: any;
  
  productComments: string[] = []; // Separate comments for each product
  @Input() productId: string = '';
  constructor(private route: ActivatedRoute,public auth:AuthService,public http:HttpClient,private router:Router,private cartservice:CartserviceService){
  
  }
 
  ngOnInit():void{
    
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if(this.type === 'products'){
      this.url = 'http://localhost:4200/assets/data/prods.json';
    }
    this.getProduct();
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  logout(){
    this.auth.logout();
  }

  ToCart(){
    this.router.navigate(['cart']);
  }

  getProduct(){
    this.http.get(this.url).subscribe((products) =>{
      this.products = products;
      this.products = this.products.map((a: any) => ({
        ...a,
        quantity: 1,
        total: a.price
      }));
      let index = this.products.findIndex(
        ( product: {id:string}) => product.id == this.id
      );
      if(index > -1) {
         this.product = this.products[index];
      }
    })
  }
 /* submitReview() {
    if (this.review.trim() !== '') {
      // Create a new review object
      const newReview = {
        text: this.review,
        date: new Date().toLocaleString()
      };

      // Add the new review to the array
      this.reviews.push(newReview);

      // Save the updated reviews to localStorage
      localStorage.setItem('reviews', JSON.stringify(this.reviews));

      // Clear the review input field
      this.review = '';
    }
  }*/
  addtoCart(item:any){
    this.cartservice.addToCart(item);
   }

   addComment() {
    if (this.newComment) {
      this.productComments.push(this.newComment);
      this.newComment = ''; // Reset the input field
      this.saveCommentsToLocalStorage(); // Save comments to local storage
    }
  }
  
  saveCommentsToLocalStorage() {
    // Store comments with a key based on productId
    localStorage.setItem(`comments_${this.productId}`, JSON.stringify(this.productComments));
  }
  
  getCommentsForProduct() {
    // Retrieve comments based on productId
    const storedComments = localStorage.getItem(`comments_${this.productId}`);
    if (storedComments) {
      this.productComments = JSON.parse(storedComments);
    }
  }
  //  onRatingChange(selectedStar: number) {
  //   // Handle the change event if needed
  //   console.log('Selected Star:', selectedStar);
  // }
}
