import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/mode.service';
import { product } from '../../models/product/product.module';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  product: product[] = [];
  categoryid: number = 0;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryid = Number(params['category'] || 0);


    });

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
    this.productService.addToCart(this.product[index]).subscribe(response => {
      console.log('Product added to cart:', response);
    });

    // راجع
    this.router.navigate(["/dashboard"])
  }


  isDarkMode(): boolean {
    return this.themeService.currentTheme;
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