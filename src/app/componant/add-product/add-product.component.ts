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


  categories = [
    { id: 0, name: Name.Electronics },
    { id: 1, name: Name.Furniture },
    { id: 2, name: Name.Grosery },
    { id: 3, name: Name.Kids },
    { id: 4, name: Name.Men },
    { id: 5, name: Name.Miscellaneous },
    { id: 6, name: Name.Nuevo },
    { id: 7, name: Name.Rrr },
    { id: 8, name: Name.Shoes },
    { id: 9, name: Name.TestingCategory },
    { id: 10, name: Name.Women }
  ];


  lengthOfProducts: number = 0;
  list: Name[] = []
  constructor(
    private productService: ProductService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.lengthOfProducts = data.length;
      this.product.id = ( this.lengthOfProducts + 5) ;
      console.log("htsisssssssssssssssss" + (this.lengthOfProducts + 5));
      // اعطاء قيمه مبداية  للصور
      this.product.images = ["https://iili.io/dR1Eyiv.jpg",
        "https://iili.io/dR1EDDg.jpg",
        "https://iili.io/dR1Emxa.jpg"]
    })



  }


  saveProduct() {
    // this.handleCategoryChange
    // this.product.category.name =Name.Kids;
    // this.product.category.id = 21;

    // this.product.id = (this.lengthOfProducts + 5)

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
  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      // Logic to handle file upload or convert it to a URL for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.images[index] = e.target.result;  // Update the image with the selected file's URL
      };
      reader.readAsDataURL(file);
    }
  }

  handleCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedCategory = this.categories[selectedIndex];

    this.product.category.name = selectedCategory.name;
    this.product.category.id = selectedCategory.id;

    console.log('Selected Category:', this.product.category);
  }
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
}


