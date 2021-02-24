import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Vendedor, TarjetaCulqui} from '../../models';
import {Router} from '@angular/router';
import {CulquiService, ApiService} from '../../services';
import {DatePipe} from '@angular/common';
import {PopupHelper} from '../../helpers';

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

  guardar(): void {
    if (this.usuario.valid) {
      const tarjeta: TarjetaCulqui = {
        card_number: this.usuario.value.card_number,
        cvv: this.usuario.value.cvv,
        expiration_month: this.usuario.value.expiration_month,
        expiration_year: this.usuario.value.expiration_year,
        email: this.usuario.value.email,
      };
      console.log(tarjeta);
      // inicio Generar Token
      this.culquiService.generarToken(tarjeta)
        .subscribe((result: any) => {
            // captura de token
            const token = result.id;
            // mensaje de Bienvenida
            this.popup.showSuccessPopup('Datos de tarjeta aprobados', 'Generando Usuario');
            // captura de token
            console.log('El token generado es ' + token);
            // Captura de fecha
            
            let fecha = this.generarFecha();

            // Vendedor Json
            let vendedor: Vendedor = {
              nombres: this.usuario.value.nombres,
              apellidos: this.usuario.value.apellidos,
              password: this.usuario.value.password,
              correo: this.usuario.value.email,
              suscripcion: {
                token: token,
                
                fechaFin: fecha
              }
            };
            console.log(vendedor);
            // Registro de Vendedor
            this.apiService.registrarVendedor(vendedor)
              .subscribe((enviado: any) => {
                console.log('Se registro con el ID ', enviado);
                this.popup.showSuccessPopup('Usuario creado', 'Correctamente');
                this.router.navigate(['/productos']);
              }, (err: any) => {
                this.popup.showErrorPopup('Usuario no creado', err);
                console.log(err);
              });
          }, (err: any) => {
            this.popup.showErrorPopup('Pago denegado', 'Hubo un problema con su pago');
            console.log(err);
            console.log('Datos de tarjeta invalidos');
          }
        );
    } else {
      this.popup.showErrorPopup('datos invalidos');
    }
  }
  generarFecha(){
    let date: Date = new Date();
    let year = date.getFullYear()+1;
    let month = date.getMonth()+1;
    let day = date.getDate();
    let fecha = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
    return fecha
    
  }
  // variables para validar
  get nombres() {
    return this.usuario.get('nombres');
  }

  get apellidos() {
    return this.usuario.get('apellidos');
  }

  get email() {
    return this.usuario.get('email');
  }

  get password() {
    return this.usuario.get('password');
  }

  get card_number() {
    return this.usuario.get('card_number');
  }

  get expiration_month() {
    return this.usuario.get('expiration_month');
  }

  get expiration_year() {
    return this.usuario.get('expiration_year');
  }

  get cvv() {
    return this.usuario.get('cvv');
  }

  get precio() {
    return this.usuario.get('precio');
  }

}
