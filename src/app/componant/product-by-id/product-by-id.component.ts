import { Component } from '@angular/core';
import { product } from '../../models/product/product.module';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/mode.service';
@Component({
  selector: 'app-product-by-id',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink ],
  templateUrl: './product-by-id.component.html',
  styleUrl: './product-by-id.component.css'
})
export class ProductByIdComponent {
  product: product[] = [];
  imageIndex: number = 0;
  constructor(private productService: ProductService, private route: ActivatedRoute, private themeService: ThemeService,
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id') || 6);
    this.productService.getAllProducts().subscribe(data => {
      // console.log(data);
      this.product = data.filter((item) => Number(item.id) === id);
      //  console.log(this.product);
    });
  }
  addToCar(): void {
    this.productService.addToCart(this.product[0]).subscribe(response => {
      console.log('Product added to cart:', response);
    });
  }




  ChangeIamgeIndex(i: number) {
    this.imageIndex = i;

  }


  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }



}
