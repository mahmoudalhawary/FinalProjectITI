import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ThemeService } from '../../services/mode.service';
import { product } from '../../models/product/product.module';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  product: product[] = [];
  searchProducts: product[] = [];

  faRemove = faRemove;
  searchText: string = '';

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id') || 6);
    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
      this.searchProducts = this.product;

    });


  } onSearchChange(): void {
    if (this.searchText.trim()) {
      this.searchProducts = this.product.filter(p => p.title.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.searchProducts = this.product;
    }
  }
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
  Editer(item: product): void {
    console.log('edit product with ID:', item._id);
  }


  delete(id: number) {
    if (confirm("are you sure")) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log(`Product with id ${id} deleted successfully`);
      },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
