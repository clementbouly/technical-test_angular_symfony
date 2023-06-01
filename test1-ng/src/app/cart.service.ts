import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { Cart, CartItem } from './models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  openedCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({
    items: [],
    total: 0,
    totalItems: 0,
  });
  cartUpdate$!: Subscription;

  constructor() {
    this.initCartSessionStorage();
    this.handleCartSessionStorageUpdate();
  }

  addToCart(cartItem: CartItem): void {
    const currentCartItems = this.cart$.value.items;

    if (currentCartItems.find((item) => item.id === cartItem.id)) {
      this.updateCartItemIfExist(cartItem);
    } else {
      this.cart$.next({
        ...this.cart$.value,
        items: [...currentCartItems, cartItem],
      });
    }
    this.calculateTotal();
  }

  removeFromCart(id: Number): void {
    const currentCartItems = this.cart$.value.items;
    const newCartItems = currentCartItems.filter((item) => item.id !== id);

    this.cart$.next({
      ...this.cart$.value,
      items: newCartItems,
    });
    this.calculateTotal();
  }

  updateQuantity(id: number, quantity: number): void {
    const currentCartItems = this.cart$.value.items;
    const newCartItems = currentCartItems.map((item) => {
      if (item.id === id) {
        item.quantity = quantity;
        return item;
      }
      return item;
    });

    this.cart$.next({
      ...this.cart$.value,
      items: newCartItems,
    });
    this.calculateTotal();
  }

  clearCart(): void {
    this.cart$.next({
      items: [],
      total: 0,
      totalItems: 0,
    });
  }

  toggleCart(): void {
    this.openedCart$.next(!this.openedCart$.value);
  }

  getCartItems(): Observable<CartItem[]> {
    return of(this.cart$.value.items);
  }

  getCartTotal(): Observable<number> {
    return of(this.cart$.value.total);
  }

  private updateCartItemIfExist(cartItem: CartItem): void {
    this.cart$.value.items.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity += cartItem.quantity;
        return item;
      }
      return item;
    });
  }

  private calculateTotal(): void {
    const total = this.cart$.value.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalItems = this.cart$.value.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    this.cart$.next({
      ...this.cart$.value,
      total,
      totalItems,
    });
  }

  private initCartSessionStorage(): void {
    this.cart$.next(
      JSON.parse(sessionStorage.getItem('cart') || '{"items": [], "total": 0}')
    );
  }

  private handleCartSessionStorageUpdate(): void {
    this.cartUpdate$ = this.cart$.subscribe((cart) => {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    });
  }

  ngOnDestroy(): void {
    this.cartUpdate$.unsubscribe();
  }
}
