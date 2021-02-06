import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  correoFormat="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  public usuario: FormGroup = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    correo: new FormControl('',[Validators.required,Validators.pattern(this.correoFormat)]),
     });

  ngOnInit(): void {
  }

  login(){
    if (this.usuario.valid) {
    const user: Usuario = {
      password: this.usuario.value.password,
      correo: this.usuario.value.correo,
    };
    console.log(user);
    this.http.post('https://nta-admin.herokuapp.com/api/vendedor/login', user)
        .subscribe((enviado) => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido a mi Tienda',
            showConfirmButton: false,
            timer: 1500
          })
      console.log(enviado);

       this.router.navigate(['/productos']);
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'correo o contraseña incorrectos',
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'datos invalidos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  //variables para validar
  get correo(){return this.usuario.get('correo')};
  get password(){return this.usuario.get('password')};

}
