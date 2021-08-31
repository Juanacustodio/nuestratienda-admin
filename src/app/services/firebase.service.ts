import firebase from 'firebase/app';
import {Producto} from '../models';
import { PopupHelper } from '../helpers';
import * as _ from 'lodash';

export class FirebaseService {
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  popup = new PopupHelper();
  constructor(firestoreConfig: any) {
    const {idFirebase, ...options} = firestoreConfig;
    const appName = 'tienda' + idFirebase;
    var myApp = undefined;
    firebase.apps.forEach(app => {
      if (app.name == appName) {
        myApp = app;
      }
      else {
        app.delete();
      }
    });

    if (myApp == undefined) {
      myApp = firebase.initializeApp(options, appName);
    }
    this.firestore = firebase.firestore(myApp);
    this.storage = firebase.storage(myApp);
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
  getCollectionInOrder(collection: string, callback: (...all: any) => void): any {
    return this.firestore.collection(collection).orderBy('fecha', 'desc').get().then((response: any) => {
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

  uploadProductImage(ref: string, file: any, callback: (...all: any) => void): void {
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
