import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent {
  faShoppingCart = faShoppingCart;
  cartItemsCount = 0;
  cartItemSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartItemsCount = cart.totalItems;
    });
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }

  ngOnDestroy(): void {
    this.cartItemSubscription.unsubscribe();
  }
}
