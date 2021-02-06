import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
  title = 'admin';
  menu = [
    {
      nombre: 'Mi tienda',
      route: '/tienda'
    },
    {
      nombre: 'Categorías',
      route: '/categorias'
    },
    {
      nombre: 'Productos',
      route: '/productos'
    },
  ];

  constructor(private cookies: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.cookies.delete("token");
    this.router.navigate(['/login']);
  }

}
