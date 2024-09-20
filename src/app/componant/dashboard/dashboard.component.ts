import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product/product.module';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  product: product[] = [];

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id') || 6);
    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
      console.log("this.product from   dashboard);" + this.product[5].description);

    });
  }
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
  Editer(item: product): void {
    console.log('edit product with ID:', item._id);
    // this.router.navigate(['editByID', item]);
  }
}
