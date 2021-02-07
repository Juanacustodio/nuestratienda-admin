import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario, Tienda, Vendedor} from '../models';
import {SessionService} from './session.service';

@Injectable()
export class ApiService {

  endpoint = 'https://nta-admin.herokuapp.com';

  constructor(private http: HttpClient, private sessionService: SessionService) {
  }

  private getOptions(): any {
    return {
      headers: {
        'Authorization': `Bearer ${this.sessionService.getSessionToken()}`
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
