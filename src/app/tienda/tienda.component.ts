import {Component, OnInit} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';
import {Tienda} from '../models';
import Swal from 'sweetalert2';
import {ApiService} from '../services';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  tiendaId: number;
  tienda: Tienda;

  constructor(private apiService: ApiService, private cookies: CookieService, private firestorage: AngularFireStorage) {
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

  guardarTienda(){
    
  }

  // guardarTienda(): void {
  //   const logo = document.getElementById("logo").files[0];
  //   const referencia = this.firestorage.ref('logo');
  //   this.firestorage.upload('logo', logo);
  //   referencia.getDownloadURL().subscribe((URL) => {
  //     this.tienda.logoUrl = URL;
  //     this.apiService
  //       .updateTienda(this.tienda)
  //       .subscribe((result: any) => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Actualización exitosa',
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //       });
  //   });
  // }

}
