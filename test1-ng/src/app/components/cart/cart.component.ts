import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CartService } from '../../cart.service';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Cart } from '../../models/Cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  faTrash = faTrash;
  faTimes = faTimes;

  cart: Cart = {
    items: [],
    total: 0,
    totalItems: 0,
  };

  @ViewChild('modal') modal!: ElementRef;

  cartSubscription!: Subscription;
  toggleCartSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.toggleCartSub();
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  confirmClearCart(): void {
    this.modal.nativeElement.showModal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.modal.nativeElement.close();
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  updateQuantity(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }

  onQuantityInput(
    event: Event,
    itemId: number,
    quantityInput: HTMLInputElement
  ) {
    const newQuantity = +quantityInput.value;
    if (newQuantity >= 1) {
      this.updateQuantity(itemId, newQuantity);
    } else {
      event.preventDefault();
      quantityInput.value = '1';
    }
  }

  toggleCartSub(): void {
    this.toggleCartSubscription = this.cartService.openedCart$.subscribe(
      (openedCart) => {
        this.renderer[openedCart ? 'addClass' : 'removeClass'](
          this.el.nativeElement,
          '--open'
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.toggleCartSubscription.unsubscribe();
  }
}
