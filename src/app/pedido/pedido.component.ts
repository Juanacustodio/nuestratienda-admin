import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Pedido, Cliente} from '../models';
import {ActivatedRoute} from '@angular/router';
import {PusherService} from '../services';
import Swal from 'sweetalert2';

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
  load: boolean;

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore, private pusherService: PusherService) {
    this.id = '';
    this.load = true;
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
      const cliente = this.firestore.collection('Usuarios').doc(pedido.clienteID).valueChanges();
      cliente.subscribe(c => {
        this.pedido = {
          id: pedido.id,
          fecha: (new Date(pedido.fecha.toDate())).toLocaleString(),
          estado: this.estados[pedido.estado],
          estadoColor: this.estadosColor[pedido.estado],
          envio: pedido.envio,
          total: pedido.total,
          pedido: pedido.pedido,
          clienteID: pedido.clienteID,
          cliente: c as Cliente,
        };
        this.load = false;
      });
    });
  }

  sendNotification(): void {
    this.pusherService.trigger('pedido', 'enviado-' + this.pedido.id);
    Swal.fire({
      icon: 'success',
      title: 'Notificación enviada',
      showConfirmButton: false,
      timer: 1500
    });
  }

}
