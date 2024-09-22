import { Routes } from '@angular/router';
import { ProductsComponent } from './componant/products/products.component';
import { ProductByIdComponent } from './componant/product-by-id/product-by-id.component';
import { DashboardComponent } from './componant/dashboard/dashboard.component';
import { EditProductComponent } from './componant/edit-product/edit-product.component';
import { HomeComponent } from './componant/home/home.component';
import { AboutComponent } from './componant/about/about.component';
import { LoginComponent } from './componant/login/login.component';
import { SignUpComponent } from './componant/sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products/category?', component: ProductsComponent, title: 'Products' },
    { path: 'products', component: ProductsComponent, title: 'Products' },
    { path: 'dashboard', component: DashboardComponent, title: 'dashboard' },
    { path: 'home', component: HomeComponent, title: 'home' },
    { path: 'about', component: AboutComponent, title: 'about' },
    { path: 'login', component:LoginComponent, title: 'login' },
    { path: 'signup', component:SignUpComponent, title: 'signup' },
    { path: 'editById/:id', component: EditProductComponent, title: 'productById' },
    { path: 'productById/:id', component: ProductByIdComponent, title: 'Product Details' },
    { path: '**', component: ProductByIdComponent, title: 'Not Found' },
];
