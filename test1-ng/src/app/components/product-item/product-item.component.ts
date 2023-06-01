import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../cart.service';
import { CartItem } from '../../models/Cart';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    const cartItem = { ...this.product, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }
}
