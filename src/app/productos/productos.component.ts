import {Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Producto} from '../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any;
  constructor(private router: Router, private firestore: AngularFirestore) {
    this.productos = firestore.collection('Productos').valueChanges({idField: 'id'})
      .subscribe(productos => this.productos = productos);
  }

  ngOnInit(): void {
  }

  toProductDetail(id: string): void {
    this.router.navigate(['/admin/productos/' + id]);
  }

}
