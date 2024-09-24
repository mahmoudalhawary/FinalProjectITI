import { CommonModule } from '@angular/common';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { product, shopProduct } from '../../models/product/product.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/mode.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ProductsComponent, CommonModule, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class ShoppingCartComponent implements OnInit {


  add() {

    this.router.navigate(['products'])
    // this.route.navigate(['/shopping-cart'])
    // throw new Error('Method not implemented.');
  }
  // item : any = [];



  product: product[] = [];
  categoryid: number = 0;
  userId?: number;

  // Assuming categoryid is a number
  constructor(
    private ShoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId') || 6);

    this.route.queryParams.subscribe(params => {
      this.categoryid = +params['categoryid'] || 0;
      this.loadProducts();
    });


  }

  loadProducts(): void {
    this.ShoppingCartService.getItems().subscribe(data => {
      this.product = data;
      this.product = this.product.filter((item) => item.userID === this.userId)
      if (this.categoryid !== 0) {
        this.product = data.filter((item) => item.category.id === this.categoryid);
      }
    });
  }






  delete(item: product) {
    this.ShoppingCartService.delete(item).subscribe(() => {
      console.log(`product ${item.title} are deleted`);

      this.product = this.product.filter(i => i.id !== item.id);
    });
  }



}
