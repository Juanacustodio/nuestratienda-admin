import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { AngularFireModule } from '@angular/fire';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CookieService } from 'ngx-cookie-service';
import {ApiService, CulquiService, SessionService, PusherService} from './services';

import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { TiendaComponent } from './tienda/tienda.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { FuncionaComponent } from './components/funciona/funciona.component';
import { EjemplosComponent } from './components/ejemplos/ejemplos.component';
import { HomeComponent } from './components/home/home.component';
import { MenuAdminComponent } from './components/shared/menu-admin/menu-admin.component';
import { AdminComponent } from './admin/admin.component';
import { CardFuncionComponent } from './components/card-funcion/card-funcion.component';
import { CardProductoComponent } from './components/card-producto/card-producto.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedido/pedido.component';
import {FirebaseService} from './services/firebase.service';
import { CuentaComponent } from './cuenta/cuenta.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { VendedorComponent } from './vendedor/vendedor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ProductoComponent,
    HomeComponent,
    CategoriasComponent,
    TiendaComponent,
    NavbarComponent,
    FooterComponent,
    RegistroComponent,
    LoginComponent,
    FuncionaComponent,
    EjemplosComponent,
    MenuAdminComponent,
    AdminComponent,
    CardFuncionComponent,
    CardProductoComponent,
    PedidosComponent,
    PedidoComponent,
    CuentaComponent,
    TiendasComponent,
    VendedoresComponent,
    VendedorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ColorPickerModule,
    MatSlideToggleModule,
  ],
  providers: [
    CookieService,
    ApiService,
    CulquiService,
    SessionService,
    PusherService,
    // FirebaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
