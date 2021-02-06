import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Usuario, Tienda, Vendedor} from '../models';

@Injectable()
export class ApiService {

  endpoint = 'https://nta-admin.herokuapp.com';
  token: string;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.token = this.cookies.get('token');
  }

  private getOptions(): any {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  login(user: Usuario): any {
    return this.http.post(`${this.endpoint}/api/vendedor/login`, user);
  }

  getTienda(tiendaId: number): any {
    return this.http.get(
      `${this.endpoint}/api/tienda/${tiendaId}`,
      this.getOptions()
    );
  }

  updateTienda(tienda: Tienda): any {
    return this.http.post(
      `${this.endpoint}/api/tienda/actualizar`,
      tienda,
      this.getOptions()
    );
  }

  registrarVendedor(vendedor: Vendedor): any {
    return this.http.post(
      `${this.endpoint}/api/vendedor/registro`,
      vendedor);
  }

}
