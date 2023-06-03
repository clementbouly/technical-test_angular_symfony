import { Component } from '@angular/core';
import { CartService } from '../../cart.service';
import { faShoppingCart, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faBook = faBook;
  
}
