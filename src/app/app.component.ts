import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductsComponent } from './componant/products/products.component';
import { ProductByIdComponent } from './componant/product-by-id/product-by-id.component';
import { HeaderComponent } from './componant/header/header.component';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "./componant/footer/footer.component";
import { LoginComponent } from './componant/login/login.component';
import { SignUpComponent } from './componant/sign-up/sign-up.component';


  @Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ProductsComponent, ProductByIdComponent, HeaderComponent, 
    FooterComponent,LoginComponent,SignUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
 
export class AppComponent {
 

}
