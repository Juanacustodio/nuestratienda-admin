import { Component, OnInit } from '@angular/core';
import {FirebaseService, SessionService} from '../services';
import {PopupHelper} from '../helpers';
import * as _ from 'lodash';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias: Array<{nombre: string}> = [];
  id: any;
  popup = new PopupHelper();
  firestore: FirebaseService;

  constructor(sessionService: SessionService) {
    this.firestore = new FirebaseService(sessionService.getFirebaseJsonConfig());
  }

  ngOnInit(): void {
    this.firestore.getCollection('Categorias', params => {
      if (_.isEmpty(params)) {
        this.categorias = [];
      }
      else {
        [{'Categorias': this.categorias, id: this.id}] = params as Array<{id: string, Categorias: any}>;
      }
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
