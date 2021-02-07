import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import {ApiService, CulquiService, SessionService} from './services';

import { ColorPickerModule } from 'ngx-color-picker';

// import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { TiendaComponent } from './tienda/tienda.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { FuncionaComponent } from './components/funciona/funciona.component';
import { ElegirComponent } from './components/elegir/elegir.component';
import { EjemplosComponent } from './components/ejemplos/ejemplos.component';

import { HomeComponent } from './components/home/home.component';
import { MenuAdminComponent } from './components/shared/menu-admin/menu-admin.component';
import { AdminComponent } from './admin/admin.component';

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
    ElegirComponent,
    EjemplosComponent,
    MenuAdminComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ColorPickerModule,
  ],
  providers: [
    CookieService,
    ApiService,
    CulquiService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
