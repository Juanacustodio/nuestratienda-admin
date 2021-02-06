import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario';
import {CookieService} from 'ngx-cookie-service';
import {Tienda} from '../models/tienda';

@Injectable()
export class ApiService {

  endpoint = 'https://nta-admin.herokuapp.com';
  token: string;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.token = this.cookies.get('token');
  }

  login(user: Usuario): any {
    return this.http.post(`${this.endpoint}/api/vendedor/login`, user);
  }

  getTienda(tiendaId: number): any {
    return this.http.get(
      `${this.endpoint}/api/tienda/${tiendaId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    );
  }

  updateTienda(tienda: Tienda): any {
    return this.http.post(
      `${this.endpoint}/api/tienda/actualizar`,
      tienda,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    );
  }

}
