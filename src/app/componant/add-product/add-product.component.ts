import { Component, OnInit } from '@angular/core';
import { Name, product } from '../../models/product/product.module';
import { ThemeService } from '../../services/mode.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  product: product = {} as product;
  lengthOfProducts: number = 0;
  list: Name[] = []
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.lengthOfProducts = data.length;
      console.log("htsisssssssssssssssss" + (this.lengthOfProducts + 5));
    })


  }


  saveProduct() {
    this.product.id = (this.lengthOfProducts + 5)
    this.productService.addProduct(this.product).subscribe(
      response => {
        console.log('Product added successfully:', response);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }

  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
}


