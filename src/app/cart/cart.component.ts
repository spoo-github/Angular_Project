import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { CartserviceService } from '../services/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: any[] = [];
  public allProducts: any = 0;
  totalItemNumber: number = 0;
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient,
    private cartservice: CartserviceService
  ) {}

  goToHome(): void {
    this.router.navigate(['home']);
  }

  logout(): void {
    this.auth.logout();
  }

  ToCart(): void {
    this.router.navigate(['cart']);
  }

  ngOnInit(): void {
    this.products = this.cartservice.getCartItems();
    this.allProducts = this.cartservice.getTotalAmount();
    this.total = 0;

    this.cartservice.getProductData().subscribe((res: any[]) => {
      this.products = res;
      this.totalItemNumber = res.length;
      this.calculateTotal();
    });
  }

  removeProduct(item: any): void {
    const productIdToRemove = item.id;
    this.products = this.products.filter((p, index) => p.id !== productIdToRemove);
  
    this.total = this.products.reduce((sum, product) => sum + parseFloat(product.total), 0);
    this.cartservice.removeCartData(item);
  }
  

  removeAllProduct(): void {
    this.cartservice.removeAllCart();
  }

  calculateTotal(): void {
   
    this.total = this.products.reduce((sum, product) => sum + parseFloat(product.total), 0);
  }
}
