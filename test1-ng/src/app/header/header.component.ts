import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  toggleCart(): void {
    this.cartService.toggleCart();
  }
}
