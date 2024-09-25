import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/mode.service';
import { Category, product, shopProduct } from '../../models/product/product.module';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  product: product[] = [];
  shopProduct: shopProduct[] = [];
  categoryid: number = 0;
  categories: Category[] = [];
  userId?: number | boolean | any;
  // userFlag?: boolean | any = false;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    private roleService: RoleService
  ) { }
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    this.route.queryParams.subscribe(params => {
      this.categoryid = Number(params['category'] || 0);


    });
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    })
    this.productService.getAllProducts().subscribe(data => {
      this.product = data;

      if (this.categoryid != 0) {
        this.product = data.filter((item) => item.category.id === this.categoryid);
      } else {
        this.ngOnInit()
      }
    });
  }
  navigateToCategory(catgId: Number): void {
    console.log('Navigating to category:');
    this.router.navigate(['/products'], { queryParams: { category: catgId } });
    this.ngOnInit()

  }
  addToCar(index: number): void {
    console.log("start");

    if (this.isUser()) {
      this.product[index].userID = this.userId;
      this.productService.addToCart(this.product[index]).subscribe(response => {
        console.log('Product added to cart:', response);
      });
      this.router.navigate(["/shopcart", this.userId])
    } else {
      this.router.navigate(["/login"])
      console.log('Product not added to');

    }
    console.log("end");
  }


  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }

  isUser(): boolean {
    return this.roleService.isUserRole;
  }
  isAdmin(): boolean {
    return this.roleService.isAdminRole;
  }




  showFullText: boolean = false;

  truncatedText(text: string): string {
    const words = text.split(' ');
    if (this.showFullText || words.length <= 6) {
      return text;
    } else {


      return words.slice(0, 7).join(' ') + '...';


    }
  }

  currentCategory: number = 0;


  isActive(categoryId: number): boolean {
    return this.currentCategory === categoryId;
  }



}