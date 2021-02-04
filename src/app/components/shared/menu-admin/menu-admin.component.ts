import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
  title = 'admin';
  menu = [
    'Mi tienda',
    'Categorías',
    'Productos'
  ];


  constructor() { }

  ngOnInit(): void {
  }
  

}
