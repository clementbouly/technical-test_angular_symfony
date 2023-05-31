import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  openedCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.initCartSessionStorage();
    this.handleUpdateCartSessionStorage();
  }

  addToCart(cartItem: CartItem): void {
    const currentCartItems = this.cartItems$.value;
    if (currentCartItems.find((item) => item.id === cartItem.id)) {
      this.updateCartItemIfExist(cartItem);
    } else {
      this.cartItems$.next([...currentCartItems, cartItem]);
    }

    this.calculateTotal();
  }

  removeFromCart(id: Number): void {
    const currentCartItems = this.cartItems$.value;
    const newCartItems = currentCartItems.filter((item) => item.id !== id);
    this.cartItems$.next(newCartItems);
    this.calculateTotal();
  }

  clearCart(): void {
    this.cartItems$.next([]);
    this.cartTotal$.next(0);
  }

  toggleCart(): void {
    this.openedCart$.next(!this.openedCart$.value);
  }

  private updateCartItemIfExist(cartItem: CartItem): void {
    this.cartItems$.value.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity += cartItem.quantity;
        return item;
      }
      return item;
    });
  }

  private calculateTotal(): void {
    const total = this.cartItems$.value.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    this.cartTotal$.next(total);
  }

  private initCartSessionStorage(): void {
    this.cartItems$.next(
      JSON.parse(sessionStorage.getItem('cartItems') || '[]')
    );
    this.cartTotal$.next(
      JSON.parse(sessionStorage.getItem('cartTotal') || '0')
    );
  }

  private handleUpdateCartSessionStorage(): void {
    this.cartItems$.subscribe((cartItems) => {
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
    this.cartTotal$.subscribe((cartTotal) => {
      sessionStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    });
  }
}
