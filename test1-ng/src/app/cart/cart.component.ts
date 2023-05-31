import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  faTrash = faTrash;
  faTimes = faTimes;

  cartItems$ = this.cartService.cartItems$;
  cartTotal$ = this.cartService.cartTotal$;

  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.toggleCartSubscription();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  toggleCartSubscription(): void {
    this.cartService.openedCart$.subscribe((openedCart) => {
      this.renderer[openedCart ? 'addClass' : 'removeClass'](
        this.el.nativeElement,
        '--open'
      );
    });
  }
}
