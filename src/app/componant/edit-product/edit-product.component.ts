import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, product } from '../../models/product/product.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/mode.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']  
})
export class EditProductComponent {
  product: product = {} as product;  
  categories: Category[] = [];
  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(data => {
        this.product = data;
      });
    }

    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  updateProduct(): void {
    if (this.productId) {
      this.productService.updateProduct(this.productId, this.product).subscribe(
        response => {
          console.log('Product updated successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.images[index] = e.target.result;  
      };
      reader.readAsDataURL(file);
    }
  }

  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }

  handleCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    const selectedCategory = this.categories.find(category => category.name === selectedValue);

    if (selectedCategory) {
      this.product.category = { ...selectedCategory };
      console.log('Selected Category:', this.product.category);
    } else {
      console.warn('Selected category not found');
    }
  }
}
