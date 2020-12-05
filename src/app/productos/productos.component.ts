import { Component, OnInit } from '@angular/core';
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

  private router;
  productos: Observable<any[]>;
  constructor(private r: Router, firestore: AngularFirestore) {
    this.router = r;
    this.productos = firestore.collection('Productos').valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
  }

  toProductDetail(id: string): void {
    this.router.navigateByUrl('/producto/' + id);
  }

}
