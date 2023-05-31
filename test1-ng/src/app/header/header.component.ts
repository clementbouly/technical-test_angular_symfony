import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faShoppingCart = faShoppingCart;
  openedCart$ = this.cartService.openedCart$;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  toggleCart(): void {
    this.cartService.toggleCart();
  }
}
