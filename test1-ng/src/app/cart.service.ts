import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  openedCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggleCart(): void {
    this.openedCart$.next(!this.openedCart$.value);
  }
}
