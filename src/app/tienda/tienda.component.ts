import {Component, OnInit} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';
import {Tienda} from '../models';
import Swal from 'sweetalert2';
import {ApiService} from '../services';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  tiendaId: number;
  tienda: Tienda;

  constructor(private apiService: ApiService, private cookies: CookieService) {
    this.tiendaId = parseInt(this.cookies.get('tiendaId'));
    this.tienda = {} as Tienda;
  }

  ngOnInit(): void {
    this.apiService
      .getTienda(this.tiendaId)
      .subscribe((result: Tienda) => {
        this.tienda = result as Tienda;
      });
  }

  guardarTienda(): void {
    this.apiService
      .updateTienda(this.tienda)
      .subscribe((result: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}
