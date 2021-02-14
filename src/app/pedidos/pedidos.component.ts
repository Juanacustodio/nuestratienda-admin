import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import * as _ from 'lodash';
import {Pedido} from '../models/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: Array<any> = [];
  estados: any;
  estadosColor: any;

  constructor(private router: Router, private firestore: AngularFirestore) {
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
    firestore.collection('Pedidos').valueChanges({idField: 'id'})
      .subscribe(pedidos => {
        _.forEach(pedidos, (p) => {
          const pedido = p as Pedido;
          const newPedido = {
            id: pedido.id,
            fecha: (new Date(pedido.fecha.toDate())).toLocaleString(),
            estado: this.estados[pedido.estado],
            estadoColor: this.estadosColor[pedido.estado],
            total: pedido.total,
            productos: pedido.pedido,
          };
          this.pedidos.push(newPedido);
        });
      });
  }

  ngOnInit(): void {
  }

  toPedidoDetail(id: string): void {
    this.router.navigate(['/admin/pedidos/' + id]);
  }

}