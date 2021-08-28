import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PopupHelper } from '../helpers';
import { Cuenta } from '../models/cuenta';
import { ApiService } from '../services';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  popup = new PopupHelper();
  cuentaId: number;
  cuenta: Cuenta;

  constructor(private apiService: ApiService, private cookies: CookieService) {
    this.cuentaId = parseInt(this.cookies.get('tiendaId'));
    this.cuenta = {} as Cuenta;
  }

  ngOnInit(): void {
    this.apiService
      .getCuenta(this.cuentaId)
      .subscribe((result: Cuenta) => {
        this.cuenta = result as Cuenta;
      });
  }

  guardarCuenta(): void {
    if (!this.cuenta.nombres.match('[a-z]') || !this.cuenta.apellidos.match('[a-z]')) {
      this.popup.showErrorPopup('Nombre o apellidos inválido');
      return;
    }

    this.apiService
      .updateCuenta(this.cuenta)
      .subscribe((result: any) => {
        this.popup.showSuccessPopup('Actualización exitosa');
      });
  }

}
