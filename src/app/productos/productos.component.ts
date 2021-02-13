import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any;
  producto = {} as Producto
  btnText: string
  modalTitle: String
  id: string;
  categorias: any;

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.productos = firestore.collection('Productos').valueChanges({ idField: 'id' })
      .subscribe(productos => this.productos = productos);
    this.btnText = 'Guardar'
    this.modalTitle = 'Detalles del producto'
    this.id = ''
  }

  ngOnInit(): void {
    const categorias = this.firestore.collection('Categorias').valueChanges();
    categorias.subscribe(params => {
      [{ 'Categorias': this.categorias }] = params as Array<{ Categorias: any }>;
    });
  }

  // toProductDetail(id: string): void {
  //this.router.navigate(['/admin/productos/' + id]);
  // }
  productDetail(id: string) {
    if (this.id === 'nuevo') {
    //TODO Revisar por que no funciona
      this.btnText = 'AGREGAR'
      this.modalTitle = 'Nuevo producto'
    }
    this.productos.forEach((p: Producto) => {
      if (p.id == id) {
        this.producto = p
      }
    });
  }
}
