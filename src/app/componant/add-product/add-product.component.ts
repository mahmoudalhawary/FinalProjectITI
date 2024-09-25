import { Component, OnInit } from '@angular/core';
import { Category, product2 } from '../../models/product/product.module';
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
  categories: Category[] = [];
  product: product2[] = [
    {
      category: {
        id: 1,
        name: "Clothes"
      },
      userID: 12,
      _id: "659e8a485f3b1887ef3212e0",
      id: "00",
      title: " ",
      price: 0,
      description: " ",
      images: [
        " ",
        "  ",
        "  "
      ]
    }
  ];

  lengthOfProducts: number = 0;
  constructor(
    private productService: ProductService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });
    this.productService.getAllProducts().subscribe(data => {
      this.lengthOfProducts = data.length;
      this.product[0].id = ((this.lengthOfProducts + 5).toString());

    })



  }


  saveProduct() {

    this.productService.addProduct(this.product[0]).subscribe(
      response => {
        console.log('Product added successfully:', response);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }
  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product[0].images[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

     const selectedCategory = this.categories.find(category => category.name === selectedValue);

    if (selectedCategory) {
       this.product[0].category = { ...selectedCategory };
      console.log('Selected Category:', this.product[0].category);
    } else {
      console.warn('Selected category not found');
    }
  }


  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
}


