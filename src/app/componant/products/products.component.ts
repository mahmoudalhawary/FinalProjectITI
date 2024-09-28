import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/mode.service';
import { Category, product, shopProduct } from '../../models/product/product.module';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  product: product[] = [];
  searchProducts: product[] = [];
  categories: Category[] = [];

  categoryid: number = 0;
  userId?: number | any = 0;
  searchText: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId')) || null;

    this.route.queryParams.subscribe(params => {
      this.categoryid = Number(params['category'] || 0);
      this.filterProducts();
    });

    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    if (this.categoryid !== 0) {
      this.searchProducts = this.product.filter(item => item.category.id == this.categoryid);
    } else {
      this.searchProducts = this.product;
    }
  }

  navigateToCategory(catgId: number): void {
    if (catgId > 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: catgId },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(["/products"]);
    }
  }

  addToCar(index: number): void {
    if (this.userId) {
      this.product[index].userID = this.userId;
      this.productService.addToCart(this.product[index]).subscribe(response => {
        console.log('Product added to cart:', response);
      });
      this.router.navigate(['/shopcart', this.userId]);
    } else {
      this.router.navigate(['/login']);
    }
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

  isActive(categoryId: number): boolean {
    return this.categoryid === categoryId;
  }

  onSearchChange(): void {
    if (this.searchText.trim()) {
      this.searchProducts = this.product.filter(p => p.title.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.searchProducts = this.product;
    }
  }
}
