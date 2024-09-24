import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private themeService: ThemeService,
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
        this.router.navigate(['/dashboard']);

      },
      error => {
        console.error('Error updating product:', error);
      }

    );
  } onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      // Logic to handle file upload or convert it to a URL for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product[0].images[index] = e.target.result;  // Update the image with the selected file's URL
      };
      reader.readAsDataURL(file);
    }
  }
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
}
