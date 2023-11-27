import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartserviceService } from '../services/cartservice.service';

@Component({
  selector: 'app-allprodsdet',
  templateUrl: './allprodsdet.component.html',
  styleUrls: ['./allprodsdet.component.css']
})
export class AllprodsdetComponent {
  //images: any[] = [];
  type = '';
  id = '';
  url = '';
  readonly="true";
  products:any;
  product: any;
  comments: string[] = [];
  newComment: any;
  
  productComments: string[] = []; // Separate comments for each product
  @Input() productId: string = '';
  
  constructor(private route: ActivatedRoute,private router:Router,private auth:AuthService,private http:HttpClient,private cartservice: CartserviceService){}
  /*Handle(event:number){
    alert(`You rated ${event}`);
  }*/
  

  ngOnInit():void{

    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if(this.type === 'products'){
      this.url = 'http://localhost:4200/assets/data/allprods.json';
    }
    this.getProduct();
    this.productId = this.route.snapshot.params['id']; // Store the current productId
    this.getCommentsForProduct();
   // this.getCommentsFromLocalStorage();
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
  ToProdDet(type:string,id:string){
    this.router.navigate(['allprodsdet',type,id]);
 }
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
onRatingChange(selectedStar: number) {
  // Handle the change event if needed
  console.log('Selected Star:', selectedStar);
}
}


