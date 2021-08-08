import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductosComponent} from './productos/productos.component';
import {CategoriasComponent} from './categorias/categorias.component';
import {TiendaComponent} from './tienda/tienda.component';
import {EjemplosComponent} from './components/ejemplos/ejemplos.component';
import {FuncionaComponent} from './components/funciona/funciona.component';
import {RegistroComponent} from './components/registro/registro.component';
import {LoginComponent} from './components/login/login.component';

import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {PedidosComponent} from './pedidos/pedidos.component';
import {PedidoComponent} from './pedido/pedido.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import {TiendasComponent} from './tiendas/tiendas.component';
import {VendedoresComponent} from './vendedores/vendedores.component';
import {VendedorComponent} from './vendedor/vendedor.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'ejemplos', component: EjemplosComponent},
  {path: 'funciona', component: FuncionaComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: ProductosComponent },
          { path: 'cuenta', component: CuentaComponent },
          { path: 'tiendas', component: TiendasComponent },
          { path: 'tiendas/:id', component: TiendaComponent },
          { path: 'vendedores', component: VendedoresComponent },
          { path: 'vendedores/:id', component: VendedorComponent },
          { path: 'categorias', component: CategoriasComponent },
          { path: 'productos', component: ProductosComponent },
          { path: 'pedidos', component: PedidosComponent },
          { path: 'pedidos/:id', component: PedidoComponent },
        ],
      }
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
