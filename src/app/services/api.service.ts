import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Usuario, Tienda, Vendedor} from '../models';
import {SessionService} from './session.service';
import { Renovar } from '../models/renovar';
import { Cuenta } from '../models/cuenta';

@Injectable()
export class ApiService {

  endpoint = environment.ntApiEndpoint;

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

  getTiendas(): any {
    return this.http.get(
      `${this.endpoint}/api/tienda/listar`,
      this.getOptions()
    );
  }

  getTienda(tiendaId: number): any {
    return this.http.get(
      `${this.endpoint}/api/tienda/${tiendaId}`,
      this.getOptions()
    );
  }

  getVendedores(): any {
    return this.http.get(
      `${this.endpoint}/api/vendedor/listar`,
      this.getOptions()
    );
  }

  getVendedor(vendedorId: number): any {
    return this.http.get(
      `${this.endpoint}/api/vendedor/${vendedorId}`,
      this.getOptions()
    );
  }

  updateVendedor(vendedor: Vendedor): any {
    return this.http.post(
      `${this.endpoint}/api/vendedor/actualizar`,
      vendedor,
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
  getCuenta(cuentaId: number): any {
    return this.http.get(
      `${this.endpoint}/api/vendedor/${cuentaId}`,
      this.getOptions()
    );
  }

  updateCuenta(cuenta: Cuenta): any {
    return this.http.post(
      `${this.endpoint}/api/vendedor/actualizar`,
      cuenta,
      this.getOptions()
    );
  }

  registrarVendedor(vendedor: Vendedor): any {
    return this.http.post(
      `${this.endpoint}/api/vendedor/registro`,
      vendedor);
  }

  getSuscripcion(sucripcionId: number): any {
    return this.http.get(
      `${this.endpoint}/api/vendedor/suscripcion/${sucripcionId}`,
      this.getOptions()
    );
  }

  getUser(userId: number): any {
    return this.http.get(
      `${this.endpoint}/api/vendedor/${userId}`,
      this.getOptions()
    );
  }
  RenovarSuscripcion(renovar: Renovar): any {
    return this.http.post(
      `${this.endpoint}/api/vendedor/renovar`,
      renovar,
      this.getOptions());
  }

  getFirebaseConfig(id: string): any {
    return this.http.get(
      `${this.endpoint}/api/firebase/${id}`,
      this.getOptions()
    );
  }

}
