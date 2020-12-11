import {Component, OnDestroy, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data/DataService';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nombre', 'marca', 'precio', 'id'];

  productos: Observable<any[]>;
  dataProductos: any;
  constructor(private router: Router, private dataService: DataService, firestore: AngularFirestore) {
    this.productos = firestore.collection('Productos').valueChanges({idField: 'id'});
    this.productos.subscribe(productos => this.dataProductos = productos);
  }

  ngOnInit(): void {
  }

  toProductDetail(id: string): void {
    this.router.navigate(['/productos/' + id]);
  }

  ngOnDestroy(): void {
    this.dataService.productos = this.dataProductos;
  }

}
