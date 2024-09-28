import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/mode.service';
import { product } from '../../models/product/product.module';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-product-by-id',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './product-by-id.component.html',
  styleUrl: './product-by-id.component.css'
})
export class ProductByIdComponent {
  product: product[] = [];
  userId?: number | boolean | any;

  imageIndex: number = 0;
  constructor(private productService: ProductService, private route: ActivatedRoute, private themeService: ThemeService,
    private roleService: RoleService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    const id = Number(this.route.snapshot.paramMap.get('id') || 6);
    this.productService.getAllProducts().subscribe(data => {
      this.product = data.filter((item) => Number(item.id) === id);
    });
  }
  addToCar(id: number): void {
    console.log("start");

    if (this.isUser()) {
      this.product[0].userID = this.userId;
      this.productService.addToCart(this.product[0]).subscribe(response => {
        console.log('Product added to cart:', response);
      });
      this.router.navigate(["/shopcart", this.userId])
    } else {
      this.router.navigate(["/login"])
      console.log('Product not added to');

    }
    console.log("end");
  }
  isUser(): boolean {
    return this.roleService.isUserRole;
  }

  ChangeIamgeIndex(i: number) {
    this.imageIndex = i;

  }


  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }



}
