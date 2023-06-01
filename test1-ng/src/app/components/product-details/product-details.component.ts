import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
// import left arrow icon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../cart.service';
import { CartItem } from '../../models/Cart';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  faArrowLeft = faArrowLeft;
  product!: Product;
  quantity = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const productId = Number(params.get('id'));
          return this.productService.getProduct(productId);
        }),
        tap((product) => console.log(product))
      )
      .subscribe({
        next: (product: Product) => (this.product = product),
        error: (err) => console.log(err),
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  addToCart(): void {
    const cartItem = { ...this.product, quantity: this.quantity };
    this.cartService.addToCart(cartItem);
  }
}
