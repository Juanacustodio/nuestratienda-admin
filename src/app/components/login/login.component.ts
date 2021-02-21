import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Usuario, Session} from '../../models';
import {CookieService} from 'ngx-cookie-service';
import {ApiService, SessionService} from '../../services';
import {PopupHelper} from '../../helpers/popup.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correoFormat = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  popup = new PopupHelper();

  constructor(private apiService: ApiService, private router: Router, private cookies: CookieService, private sessionService: SessionService) {
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

      this.apiService
        .login(user)
        .subscribe((result: Session) => {
          this.popup.showSuccessPopup('Bienvenido a mi Tienda');

          this.cookies.set('tiendaId', result.UserID);
          this.sessionService.setSessionToken(result.token);

          this.router.navigate(['/admin/productos']);
        }, (err: any) => {
          this.popup.showErrorPopup('correo o contraseña incorrectos');
        });
    } else {
      this.popup.showErrorPopup('datos invalidos');
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
