import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { DataService } from '../data/DataService';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  desktop: boolean;
  producto: Producto;
  id: string;
  btnText: string;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private firestore: AngularFirestore) {
    this.desktop = true;
    this.id = '';
    this.btnText = 'GUARDAR';
    this.producto = {
      id: '',
      nombre: '',
      urlImg: '',
      descripcion: '',
      precio: 0,
      marca: '',
      categoria: '',
    };
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    if (this.id === 'nuevo') {
      this.btnText = 'AGREGAR';
    }

    const productos = this.dataService.productos;
    productos.forEach((producto) => {
      if (producto.id === this.id) {
        this.producto = producto;
      }
    });

    this.desktop = window.screen.width >= 360;
  }

  guardarProducto(): void {
    const {id, ...producto} = this.producto;

    if (this.id === 'nuevo') {
      this.firestore.collection('Productos').add(producto);
    }
    else {
      this.firestore.collection('Productos').doc(id).set(producto);
    }
  }

  eliminarProducto(): void {
    const {id, ...producto} = this.producto;

    this.firestore.collection('Productos').doc(id).delete();
  }

}
