import { Component, OnInit } from '@angular/core';

import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  tiendaId: number;
  token: string;
  tienda: any;
  constructor(private cookies: CookieService, private http: HttpClient) {
    this.tiendaId = parseInt(this.cookies.get("tiendaId"));
    this.token = this.cookies.get('token');
    this.tienda = {}
  }

  ngOnInit(): void {
    const response = this.http.get(
      `https://nta-admin.herokuapp.com/api/tienda/${this.tiendaId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    ).toPromise();
    response.then(result => {
      console.log(result)
      this.tienda = result
    });
    console.log(this.tienda)
  }

  guardarTienda(): void {
    console.log(this.tienda)
    const response = this.http.post(
      `https://nta-admin.herokuapp.com/api/tienda/actualizar`,
      this.tienda,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    ).subscribe(result => {
      console.log(result)
    })
  }

}
