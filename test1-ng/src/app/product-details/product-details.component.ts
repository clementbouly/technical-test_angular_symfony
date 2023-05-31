import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product';
// import left arrow icon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart.service';
import { CartItem } from '../models/Cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  // add left arrow icon
  faArrowLeft = faArrowLeft;
  product!: Product;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = Number(params.get('id'));
      this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  addToCart(): void {
    const cartItem = new CartItem(this.product, 1);
    this.cartService.addToCart(cartItem);
  }
}
