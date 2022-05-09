import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoginComponent } from './components/login/login.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { ProduitGuard } from './guard/produit.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProduitsComponent,
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    canActivate: [ProduitGuard],
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
