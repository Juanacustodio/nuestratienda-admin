import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import firebase from 'firebase/app';
import {Producto} from '../models';

@Injectable()
export class FirebaseService {
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  constructor() {
    const options = environment.firebase;
    firebase.initializeApp(options);
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
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

  getDoc(collection: string, id: string, callback: (...all: any) => void): any {
    this.firestore.collection(collection).doc(id).get().then((doc: any) => {
      callback({...doc.data(), id: doc.id});
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

  upload(ref: string, file: any, callback: (...all: any) => void): void {
    const referencia = this.storage.ref(ref);
    const uploadTask = referencia.put(file);
    uploadTask.on('state_changed', (snapshot) => {
      // to do
    }, (error) => {
      // Handle unsuccessful uploads
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        callback(downloadURL);
      });
    });
  }

}
