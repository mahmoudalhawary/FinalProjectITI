import { Component, OnInit } from '@angular/core';
import { Category, Category2, product } from '../../models/product/product.module';
import { ProductService } from '../../services/product.service';
import { ThemeService } from '../../services/mode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  newCategorie: Category2 = {} as Category2;
  CateName: string = '';
  categories: Category[] = []
  product: product[] = []
  constructor(
    private productService: ProductService,
    private themeService: ThemeService,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.newCategorie.name = " "
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
    });

  }



  addCategorie() {
    this.newCategorie.name = this.CateName

    this.newCategorie.id = (this.categories.length + 1).toString();
    this.productService.addCategorie(this.newCategorie).subscribe(() =>
      this.router.navigate(['/addCategory'])
    )
  }

  getAllProduct(categoryId: number): number {

    return this.product.filter(c => c.category.id == categoryId).length;

  }

  editCategorie(index: number): void {

    const categoryToEdit = this.categories[index];
    const newName = prompt('Enter new category name:', categoryToEdit.name);

    if (newName && newName.trim()) {
      categoryToEdit.name = newName.trim();
      this.productService.updateCategoryName(categoryToEdit).subscribe(
        response => {
          console.log('Category updated successfully:', response);
        },
        error => {
          console.error('Error updating category:', error);
        }
      );
    }
  }

  deleteCategorie(index: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      if (!this.product.filter(c => c.category.id == index).length) {


        this.productService.deleteCategory(index).subscribe(
          response => {
            console.log('Category deleted successfully:', response);
            alert('  delete done');

            this.categories.splice(index, 1);
          },
          error => {
            console.error('Error deleting category:', error);
          }
        );
      }
      else {
        alert('Cannot delete category because it is associated with products');
      }
    }


  }



  isDarkMode(): boolean {
    return this.themeService.currentTheme
  }
}
