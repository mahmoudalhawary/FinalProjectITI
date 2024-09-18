import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../models/product/product.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/mode.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  // product: product = {} as product;
  product: product[] = [];
  productId: any = "";
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private themeService: ThemeService,  // injecting the theme service here to use its methods in the component
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(data => {
      this.product[0] = data;
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.productId, this.product[0]).subscribe(
      response => {
        console.log('Product updated successfully:', response);
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
}
