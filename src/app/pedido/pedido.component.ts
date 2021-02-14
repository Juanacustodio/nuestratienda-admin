import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Pedido} from '../models/pedido';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  id: string;
  pedido: Pedido;
  estados: any;
  estadosColor: any;

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) {
    this.id = '';
    this.pedido = {} as Pedido;
    this.estados = {
      1: 'Pendiente',
      2: 'Finalizado',
      3: 'Cancelado'
    };
    this.estadosColor = {
      1: 'light',
      2: 'success',
      3: 'danger'
    };
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    const pedido = this.firestore.collection('Pedidos').doc(this.id).valueChanges({idField: 'id'});
    pedido.subscribe(params => {
      const pedido = params as Pedido;
      this.pedido = {
        id: pedido.id,
        fecha: (new Date(pedido.fecha.toDate())).toLocaleString(),
        estado: this.estados[pedido.estado],
        estadoColor: this.estadosColor[pedido.estado],
        total: pedido.total,
        pedido: pedido.pedido,
      };
    });
  }

}
