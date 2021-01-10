import {Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'marca', 'precio', 'id'];

  productos: Observable<any[]>;
  dataProductos: any;
  constructor(private router: Router, firestore: AngularFirestore) {
    this.productos = firestore.collection('Productos').valueChanges({idField: 'id'});
    this.productos.subscribe(productos => this.dataProductos = productos);
  }

  ngOnInit(): void {
  }

  toProductDetail(id: string): void {
    this.router.navigate(['/productos/' + id]);
  }

}
