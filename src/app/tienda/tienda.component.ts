import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Tienda} from '../models';
import {ApiService} from '../services';
import { AngularFireStorage } from '@angular/fire/storage';
import {PopupHelper} from '../helpers';

import { Suscripcion } from '../models/Vendedor';
import { Vendedor } from '../models/Vendedor';
import { result, trim } from 'lodash';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TarjetaCulqui} from '../models';
import {Router} from '@angular/router';
import {CulquiService} from '../services/culqui.service';
import { Renovar } from '../models/renovar';
import Swal from 'sweetalert2';



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
  suscripcion:Suscripcion;
  user:Vendedor;
  diasRestantes: number=0;

  constructor(private apiService: ApiService, private cookies: CookieService, private firestorage: AngularFireStorage, private router: Router, private culquiService: CulquiService) {
    this.tiendaId = parseInt(this.cookies.get('tiendaId'));
    this.tienda = {} as Tienda;
    this.load = true;
    this.suscripcion={} as Suscripcion;
    this.user={} as Vendedor;
  }

  ngOnInit(): void {
    this.apiService
      .getTienda(this.tiendaId)
      .subscribe((result: Tienda) => {
        this.tienda = result as Tienda;
        this.load = false;
      });

      this.apiService
      .getSuscripcion(this.tiendaId)  
      .subscribe((result: Suscripcion)   =>{
        this.suscripcion =result as Suscripcion;

        this.verificarSuscripcion();
        

      });

      this.apiService
     .getUser(this.tiendaId)
     .subscribe((result: Vendedor) => {
       this.user = result as Vendedor;
       
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
  // correoFormat = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  numeroFormat = '[0-9]{16}';
  cvvFormat = '[0-9]{3}';

  public usuario: FormGroup = new FormGroup({
    card_number: new FormControl('', [Validators.required, Validators.pattern(this.numeroFormat)]),
    cvv: new FormControl('', [Validators.required, Validators.pattern(this.cvvFormat)]),
    expiration_year: new FormControl('', [Validators.required]),
      });

  verificarSuscripcion(){
    let fechaFin = new Date(this.suscripcion.fechaInicio);
         let diasRestantes = fechaFin.getTime() - new Date().getTime();
         this.diasRestantes  = Math.round(diasRestantes/(1000*60*60*24));
        //  this.diasRestantes  = 28;
  }
Renovar(){  
  // if (this.usuario.valid) {
    let expiration = this.usuario.value.expiration_year;
    let year = "20" + expiration.slice(3,5);
    let card = this.usuario.value.card_number;
      const tarjeta: TarjetaCulqui = {
      card_number: card.replace(/\s/g, ""),
      cvv: this.usuario.value.cvv,
      expiration_month : expiration.slice(0,2),
      expiration_year: year,
      email: this.user.correo
    };
    console.log(tarjeta);
    //inicio Generar Token
    
    this.culquiService.generarToken(tarjeta)
      .subscribe((result: any) => {
          //captura de token
          let token = result.id;
          //mensaje de Bienvenida
          Swal.fire({
            icon: 'success',
            width: 400,
            title: 'Datos de tarjeta aprobados',
            text: 'Generando Usuario',
            showConfirmButton: false,
            timer: 1500
          });
          //captura de token
          console.log('El token generado es ' + token);
          //Captura de fecha
          
          let fecha = this.generarFecha();
         

          //Vendedor Json
          let renovar: Renovar = {
            idSuscripcion: this.tienda.idTienda,
            token: token,
            fechaInicio: fecha,
          };
          console.log(renovar);
          //Registro de Vendedor
          this.apiService.RenovarSuscripcion(renovar)
            .subscribe((result: any) => {
              console.log('Se registro con el ID ', result);
              //mensaje de Bienvenida
              Swal.fire({
                icon: 'success',
                width: 400,
                title: 'Renovación de Suscripión',
                text: 'Ha renovado su suscripción',
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload();
            }, (err: any) => {
              //mensaje de Bienvenida
              Swal.fire({
                icon: 'error',
                width: 400,
                title: 'No se pudo renovar su suscripción',
                text: err,
                showConfirmButton: false,
                timer: 1500
              });
              console.log(err);
            });
        }, (err: any) => {
          //mensaje de Bienvenida
          Swal.fire({
            icon: 'error',
            width: 400,
            title: 'Pago denegado',
            text: 'Hubo un problema con su pago',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(err);
          console.log('Datos de tarjeta invalidos');

        }
      );
  // } else {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'datos invalidos',
  //     showConfirmButton: false,
  //     timer: 1500
  //   });

  // }

}
generarFecha(){
  let date: Date = new Date();
  let year = date.getFullYear()+1;
  let month = date.getMonth()+1;
  let day = date.getDate();
  let fecha = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
  return fecha
  
}
}
