import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services';
import {PopupHelper} from '../helpers';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias: any;
  id: any;
  popup = new PopupHelper();

  constructor(private firestore: FirebaseService) { }

  ngOnInit(): void {
    this.firestore.getCollection('Categorias', params => {
      [{'Categorias': this.categorias, id: this.id}] = params as Array<{id: string, Categorias: any}>;
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
    this.firestore.updateDoc('Categorias', this.id, {'Categorias': this.categorias});
    this.popup.showSuccessPopup('Se actualizaron las categorías');
  }

}
