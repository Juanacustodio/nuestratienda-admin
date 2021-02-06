import { Component, OnInit } from '@angular/core';

import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';
import {Tienda} from '../models/tienda';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  tiendaId: number;
  token: string;
  tienda: Tienda;
  constructor(private cookies: CookieService, private http: HttpClient) {
    this.tiendaId = parseInt(this.cookies.get("tiendaId"));
    this.token = this.cookies.get('token');
    this.tienda = {} as Tienda;
  }

  ngOnInit(): void {
    const response = this.http.get(
      `https://nta-admin.herokuapp.com/api/tienda/${this.tiendaId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    ).subscribe(result => {
      this.tienda = result;
    });
  }

  guardarTienda(): void {
    const response = this.http.post(
      `https://nta-admin.herokuapp.com/api/tienda/actualizar`,
      this.tienda,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    ).subscribe(result => {
      Swal.fire({
        icon: 'success',
        title: 'Actualización exitosa',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
