import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias: any;
  id: string;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    const categorias = this.firestore.collection('Categorias').valueChanges({idField: 'id'});
    categorias.subscribe(params => {
      [{'Categorias': this.categorias, id: this.id}] = params;
    });
  }

  addCategory(): void {
    this.categorias.push({'nombre': ''});
  }

  deleteCategory(category: any): void {
    for (let i = 0; i < this.categorias.length; i++) {
      if(this.categorias[i].nombre === category.nombre) {
        this.categorias.splice(i, 1);
      }
    }
  }

  saveCategories(): void {
    this.firestore.collection('Categorias').doc(this.id).set({'Categorias': this.categorias});
  }

}
