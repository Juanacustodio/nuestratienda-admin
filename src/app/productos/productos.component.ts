import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio'];
  productos = [
    {id: 1, nombre: 'Vino', precio: 80},
    {id: 2, nombre: 'Pisco', precio: 150},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
