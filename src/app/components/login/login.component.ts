import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Usuario} from '../../models/usuario';
import Swal from 'sweetalert2';
import {CookieService} from 'ngx-cookie-service';
import {ApiService} from '../../services';
import {Session} from '../../models/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correoFormat = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

  constructor(private apiService: ApiService, private http: HttpClient, private router: Router, private cookies: CookieService) {
  }

  public usuario: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required, Validators.minLength(6)
    ]),
    correo: new FormControl('', [
      Validators.required, Validators.pattern(this.correoFormat)
    ]),
  });

  ngOnInit(): void {
  }

  login(): void {
    if (this.usuario.valid) {
      const user: Usuario = {
        password: this.usuario.value.password,
        correo: this.usuario.value.correo,
      };

      this.apiService.login(user)
        .subscribe((result: Session) => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido a mi Tienda',
            showConfirmButton: false,
            timer: 1500
          });

          this.cookies.set('tiendaId', result.UserID);
          this.cookies.set('token', result.token);

          this.router.navigate(['/productos']);
        }, (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'correo o contraseña incorrectos',
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'datos invalidos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  //variables para validar
  get correo() {
    return this.usuario.get('correo');
  };

  get password() {
    return this.usuario.get('password');
  };

}
