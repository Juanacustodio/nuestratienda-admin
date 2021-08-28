import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {Pedido} from '../models';
import {FirebaseService, SessionService} from '../services';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: Array<any> = [];
  hasPedidos = false;
  estados: any;
  estadosColor: any;
  firestore: FirebaseService;

  constructor(private router: Router, private sessionService: SessionService) {
    this.firestore = new FirebaseService(sessionService.getFirebaseJsonConfig());
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
    this.firestore.getCollection('Pedidos', pedidos => {
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
    this.hasPedidos = this.pedidos.length > 0;
  }

  toPedidoDetail(id: string): void {
    this.router.navigate(['/admin/pedidos/' + id]);
  }

}
