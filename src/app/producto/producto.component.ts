import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { DataService } from '../data/DataService';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  producto: Producto;
  id: string;
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.id = '';
    this.producto = {
      id: '',
      nombre: ''
    };
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    const productos = this.dataService.productos;
    productos.forEach((producto) => {
      if (producto.id === this.id) {
        this.producto = producto;
      }
    });
  }

}
