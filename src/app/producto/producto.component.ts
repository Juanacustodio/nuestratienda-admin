import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  producto: Producto;
  id: string;
  btnText: string;
  categorias: any;

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) {
    this.id = '';
    this.btnText = 'Guardar';
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

    const categorias = this.firestore.collection('Categorias').valueChanges();
    categorias.subscribe(params => {
      [{'Categorias': this.categorias}] = params as Array<{Categorias: any}>;
    });

  }

  guardarProducto(): void {
    const {id, ...producto} = this.producto;

    if (this.id === 'nuevo') {
      this.firestore.collection('Productos').add(producto);
    }
    else {
      this.firestore.collection('Productos').doc(this.id).set(producto as Producto);
    }
  }

  eliminarProducto(): void {
    const {id, ...producto} = this.producto;

    this.firestore.collection('Productos').doc(this.id).delete();
  }

}
