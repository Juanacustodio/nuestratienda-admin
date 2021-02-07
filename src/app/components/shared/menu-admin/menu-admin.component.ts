import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from '../../../services';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
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

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.sessionService.deleteSession();
    this.router.navigate(['/login']);
  }

}
