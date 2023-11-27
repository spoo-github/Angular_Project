import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { CartserviceService } from './cartservice.service';

describe('CartserviceService', () => {
  let service: CartserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(CartserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product = { id: 1, name: 'Product 1', price: 10.0, total: 10.0 };
    service.addToCart(product);
    const cartItems = service.getCartItems();
    expect(cartItems).toContain(product);
    expect(service.getProductData().value).toEqual(cartItems);
  });
  
  it('should remove a product from the cart', () => {
    const product = { id: 1, name: 'Product 1', price: 10.0, total: 10.0 };
    service.addToCart(product);
    service.removeCartData(product);
  
    expect(service.getCartItems()).not.toContain(product);
  });
  
  
  it('should reset the cart', () => {
    const product = { id: 1, name: 'Product 1', price: 10.0, total: 10.0 };
    service.addToCart(product);
    service.removeAllCart();

    expect(service.getCartItems().length).toBe(0);
  });
});
