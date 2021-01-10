import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';

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
  categorias: any;

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) {
    this.desktop = true;
    this.id = '';
    this.btnText = 'GUARDAR';
    this.producto = {} as Producto;
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    if (this.id === 'nuevo') {
      this.btnText = 'AGREGAR';
    }

    const producto = this.firestore.collection('Productos').doc(this.id).valueChanges();
    producto.subscribe(params => {
      this.producto = params as Producto;
    });

    const categorias = this.firestore.collection('Categorias').valueChanges({idField: 'id'});
    categorias.subscribe(params => {
      [{'Categorias': this.categorias}] = params;
    });

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
