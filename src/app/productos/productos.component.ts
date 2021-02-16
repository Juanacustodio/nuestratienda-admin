import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Producto} from '../models';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any;
  producto = {} as Producto;
  btnText: string;
  modalTitle: string;
  id: string;
  categorias: any;

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.productos = firestore.collection('Productos').valueChanges({idField: 'id'})
      .subscribe(productos => this.productos = productos);
    this.btnText = 'GUARDAR';
    this.modalTitle = 'Detalles del producto';
    this.id = '';
  }

  ngOnInit(): void {
    const categorias = this.firestore.collection('Categorias').valueChanges();
    categorias.subscribe(params => {
      [{'Categorias': this.categorias}] = params as Array<{ Categorias: any }>;
    });
  }

  guardarProducto() {
    const {id, ...producto} = this.producto;
    if (this.id === 'nuevo') {
      this.firestore.collection('Productos').add(producto);
      console.log(this.producto);
    } else {
      this.firestore.collection('Productos').doc(this.id).set(producto as Producto);
      console.log(this.producto);
    }
  }

  productDetail(id: string): void {
    if (id === 'nuevo') {
      this.id = id;
      this.btnText = 'AGREGAR';
      this.modalTitle = 'Nuevo producto';
      this.producto = {} as Producto;
    } else {
      this.btnText = 'GUARDAR';
      this.modalTitle = 'Detalles del producto';
      this.productos.forEach((p: Producto) => {
        if (p.id === id) {
          this.id = p.id;
          this.producto = p;
        }
      });
    }
  }
}
