import { Product } from './Product';

export class CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;

  constructor(product: Product, quantity: number) {
    this.id = product.id;
    this.title = product.title;
    this.quantity = quantity;
    this.price = product.price;
  }
}

export interface Cart {
  items: CartItem[];
  total: number;
}
