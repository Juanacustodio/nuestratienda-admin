import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import firebase from 'firebase/app';
import {Producto} from '../models';

@Injectable()
export class FirebaseService {
  firestore: firebase.firestore.Firestore;
  constructor() {
    const options = environment.firebase;
    firebase.initializeApp(options);
    this.firestore = firebase.firestore();
  }

  getCollection(collection: string, callback: (...all: any) => void): any {
    return this.firestore.collection(collection).get().then((response: any) => {
      const result: Array<any> = [];
      response.forEach((doc: any) => {
        const p = {...doc.data(), id: doc.id} as Producto;
        result.push(p);
      });
      callback(result);
    });
  }

  addDoc(collection: string, document: any): void {
    this.firestore.collection(collection).add(document);
  }

  updateDoc(collection: string, id: string, document: any): void {
    this.firestore.collection(collection).doc(id).set(document);
  }

  deleteDoc(collection: string, id: string): void {
    this.firestore.collection(collection).doc(id).delete();
  }

}
