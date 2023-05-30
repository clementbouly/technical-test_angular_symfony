import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.toggleCartSubscription();
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
