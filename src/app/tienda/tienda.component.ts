import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Tienda} from '../models';
import {ApiService} from '../services';
import { AngularFireStorage } from '@angular/fire/storage';
import {PopupHelper} from '../helpers/popup.helper';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  load: boolean;
  tiendaId: number;
  tienda: Tienda;
  public imagePath: any;
  imgURL: any;
  public message = '';
  popup = new PopupHelper();

  constructor(private apiService: ApiService, private cookies: CookieService, private firestorage: AngularFireStorage) {
    this.tiendaId = parseInt(this.cookies.get('tiendaId'));
    this.tienda = {} as Tienda;
    this.load = true;
  }

  ngOnInit(): void {
    this.apiService
      .getTienda(this.tiendaId)
      .subscribe((result: Tienda) => {
        this.tienda = result as Tienda;
        this.load = false;
      });
  }

  preview(files: any): void {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Solo archivos de imagen validos son soportados';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
  }

  guardarTienda(): void {
    const logo  = (<HTMLInputElement>document.getElementById('logo')).files?.item(0);
    const referencia = this.firestorage.ref('logo');
    this.firestorage.upload('logo', logo);
    referencia.getDownloadURL().subscribe((URL) => {
      this.tienda.logoUrl = URL;
      this.apiService
        .updateTienda(this.tienda)
        .subscribe((result: any) => {
          this.popup.showSuccessPopup('Actualización exitosa');
        });
    });
  }
}
