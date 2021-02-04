import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { TiendaComponent } from './tienda/tienda.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ElegirComponent } from './components/elegir/elegir.component';
import { EjemplosComponent } from './components/ejemplos/ejemplos.component';
import { FuncionaComponent } from './components/funciona/funciona.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/:id', component: ProductoComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'tienda', component: TiendaComponent},
  { path: 'home', component: HomeComponent },
    { path: 'precios', component: PreciosComponent },
    { path: 'elegir', component: ElegirComponent },
    { path: 'ejemplos', component: EjemplosComponent },
    { path: 'funciona', component: FuncionaComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
