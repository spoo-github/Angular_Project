import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
//import { ProductsService } from '../services/products.service';
import { CartserviceService } from '../services/cartservice.service';


@Component({
  selector: 'app-allprods',
  templateUrl: './allprods.component.html',
  styleUrls: ['./allprods.component.css']
})
export class AllprodsComponent {

 
  products:any;
  //product: any;
  selectedCategories:string='';
  Products: any;
  totalItemNumber:number = 0;
  //originalProducts: any = [];

  searchText: string='';
  filteredProducts: any=[];
  ProductsCategories: string[]=[];
 
  
  constructor(private route: ActivatedRoute,private router:Router,private auth:AuthService,private http:HttpClient,private cartservice:CartserviceService){}
 /* Handle(event:number){
    alert(`You rated ${event}`);
  }*/
  ngOnInit():void{
   
    
    this.getProducts();
    //this.sortProducts();
    this.cartservice.getProductData().subscribe(res =>{
      this.totalItemNumber= res.length;
    })
    
  }
  getProducts(){
    this.http.get('http://localhost:4200/assets/data/allprods.json').subscribe((products)=>{
      this.Products= products;
      //this.originalProducts = [...this.Products];
      console.log(this.Products);
      
     
      this.Products = this.Products.map((a: any) => ({
        ...a,
        quantity: 1,
        total: a.price
      }));
      this.filteredProducts = this.Products;
      
      this.ProductsCategories = this.Products.map((product: any) => product.category);
      this.ProductsCategories = [...new Set(this.ProductsCategories)]; 
      
    });
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
  ToProdDet(type:string,id:string){
    this.router.navigate(['allprodsdet',type,id]);
 }


sortProducts(sortOrder: string) {
  if (this.selectedCategories) {
    // Sorting  when a category is selected
    if (sortOrder === 'priceAsc') {
      this.filteredProducts.sort((product1: any, product2: any) => product1.price - product2.price);
    } else if (sortOrder === 'priceDesc') {
      this.filteredProducts.sort((product1: any, product2: any) => product2.price - product1.price);
    }
  } else {
    // Sorting  when no category is selected
    if (sortOrder === 'priceAsc') {
      this.Products.sort((product1: any, product2: any) => product1.price - product2.price);
    } else if (sortOrder === 'priceDesc') {
      this.Products.sort((product1: any, product2: any) => product2.price - product1.price);
    }
  }
}


filterProducts() { 
 
    if ( this.selectedCategories === '') {
      this.filteredProducts = this.Products;
    }
    else{
     this.filteredProducts = this.Products.filter((product: { category: string; }) =>
    !this.selectedCategories || product.category === this.selectedCategories
  );
  //this.applySearchFilter();
}
}

applySearchFilter() {
  if (this.searchText) {
    this.filteredProducts = this.filteredProducts.filter(
      (product: { name: string }) =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
// clearSearch() {
//   this.searchText = '';
//   this.filteredProducts = this.originalProducts;
//   this.filterProducts(); // Reapply category filter if any
// }

 onSearchTextEntered(searchValue:string){
   if(this.searchText = searchValue){
    this.applySearchFilter();
   }else{
    this.filterProducts();
   };
 }

 addtoCart(item:any){
  this.cartservice.addToCart(item);
 }

//  onRatingChange(selectedStar: number) {
//   // Handle the change event if needed
//   console.log('Selected Star:', selectedStar);
// }

}
