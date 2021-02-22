import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Producto} from '../models';
import {FirebaseService} from '../services/firebase.service';
import {PopupHelper} from '../helpers';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: Array<Producto> = [];
  producto = {} as Producto;
  btnText: string;
  modalTitle: string;
  id: string;
  categorias: any;
  firestore = new FirebaseService();
  popup = new PopupHelper();

  constructor(private router: Router) {
    this.firestore.getCollection('Productos', (response: any) => {
      this.productos = response;
    });
    this.btnText = 'GUARDAR';
    this.modalTitle = 'Detalles del producto';
    this.id = '';
  }

  ngOnInit(): void {
    this.firestore.getCollection('Categorias', (response: any) => {
      [{'Categorias': this.categorias}] = response as Array<{ Categorias: any }>;
    });
  }

  guardarProducto(): void {
    const {id, ...producto} = this.producto;
    if (this.id === 'nuevo') {
      this.firestore.addDoc('Productos', producto);
    } else {
      this.firestore.updateDoc('Productos', this.id, producto);
    }
    this.popup.showSuccessPopup('Se actualizó el producto');
  }

  setIdToDelete(id: string): void {
    this.id = id;
  }

  eliminarProducto(): void {
    this.firestore.deleteDoc('Productos', this.id);
    this.popup.showSuccessPopup('Se eliminó el producto');
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
