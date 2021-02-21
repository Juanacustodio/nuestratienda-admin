import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Vendedor, TarjetaCulqui} from '../../models';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CulquiService} from '../../services/culqui.service';
import {ApiService} from '../../services';
import {DatePipe} from '@angular/common';
import {PopupHelper} from '../../helpers/popup.helper';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  popup = new PopupHelper();

  constructor(private router: Router, private culquiService: CulquiService, private apiService: ApiService) {
  }

  correoFormat = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  numeroFormat = '[0-9]{16}';
  cvvFormat = '[0-9]{3}';

  public usuario: FormGroup = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.correoFormat)]),
    card_number: new FormControl('', [Validators.required, Validators.pattern(this.numeroFormat)]),
    cvv: new FormControl('', [Validators.required, Validators.pattern(this.cvvFormat)]),
    expiration_month: new FormControl('', [Validators.required]),
    expiration_year: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
  }

  guardar() {
    if (this.usuario.valid) {
      const tarjeta: TarjetaCulqui = {
        card_number: this.usuario.value.card_number,
        cvv: this.usuario.value.cvv,
        expiration_month: this.usuario.value.expiration_month,
        expiration_year: this.usuario.value.expiration_year,
        email: this.usuario.value.email,
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
            let date: Date = new Date();
            const pipe = new DatePipe('en-US');
            const myFormattedDate = pipe.transform(date, 'YYYY-mm-dd');

            //Vendedor Json
            let vendedor: Vendedor = {
              nombres: this.usuario.value.nombres,
              apellidos: this.usuario.value.apellidos,
              password: this.usuario.value.password,
              correo: this.usuario.value.email,
              suscripcion: {
                token: token,
                fechaInicio: myFormattedDate || ''
              }
            };
            console.log(vendedor);
            //Registro de Vendedor
            this.apiService.registrarVendedor(vendedor)
              .subscribe((enviado: any) => {
                console.log('Se registro con el ID ', enviado);
                //mensaje de Bienvenida
                Swal.fire({
                  icon: 'success',
                  width: 400,
                  title: 'Usuario creado',
                  text: 'Correctamente',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigate(['/productos']);
              }, (err: any) => {
                //mensaje de Bienvenida
                Swal.fire({
                  icon: 'error',
                  width: 400,
                  title: 'Usuario no creado',
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
    } else {
      this.popup.showErrorPopup('datos invalidos');
    }
  }

  //variables para validar
  get nombres() {
    return this.usuario.get('nombres');
  };

  get apellidos() {
    return this.usuario.get('apellidos');
  };

  get email() {
    return this.usuario.get('email');
  };

  get password() {
    return this.usuario.get('password');
  };

  get card_number() {
    return this.usuario.get('card_number');
  };

  get expiration_month() {
    return this.usuario.get('expiration_month');
  };

  get expiration_year() {
    return this.usuario.get('expiration_year');
  };

  get cvv() {
    return this.usuario.get('cvv');
  };

  get precio() {
    return this.usuario.get('precio');
  };

}
