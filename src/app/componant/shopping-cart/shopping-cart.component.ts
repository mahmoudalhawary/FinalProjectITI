import { CommonModule } from '@angular/common';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { product, shopProduct } from '../../models/product/product.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/mode.service';
import { RoleService } from '../../services/role.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ProductsComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  add() {

    this.router.navigate(['products', this.userId])
  }



  product: product[] = [];
  categoryid: number = 0;
  userId?: number;

  constructor(
    private ShoppingCartService: ShoppingCartService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    // this.userId = this.getUserId();
    this.route.queryParams.subscribe(params => {
      this.categoryid = +params['categoryid'] || 0;
      this.loadProducts();
    });


  }
  // getUserId() {
  //   console.log(this.RoleService.getUserId);

  //   return this.RoleService.getAdminId;
  // }

  loadProducts(): void {
    this.ShoppingCartService.getItems().subscribe(data => {
      this.product = data;
      this.product = this.product.filter((item) => item.userID == this.userId)
      // if (this.categoryid !== 0) {
      //   this.product = data.filter((item) => item.category.id == this.categoryid);
      // }
    });


  }

  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }





  delete(item: product) {
    this.ShoppingCartService.delete(item).subscribe(() => {
      console.log(`product ${item.title} are deleted`);

      this.product = this.product.filter(i => i.id !== item.id);
    });
  }





}
