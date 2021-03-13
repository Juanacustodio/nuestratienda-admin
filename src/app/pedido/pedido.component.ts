import { Component, OnInit } from '@angular/core';
import {Pedido, Cliente} from '../models';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService, PusherService, SessionService} from '../services';
import {PopupHelper} from '../helpers';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  id: string;
  firePedido: any;
  pedido: Pedido;
  estados: any;
  estadosColor: any;
  load: boolean;
  popup = new PopupHelper();
  firestore: FirebaseService;

  constructor(private activatedRoute: ActivatedRoute, private sessionService: SessionService, private pusherService: PusherService) {
    this.firestore = new FirebaseService(sessionService.getFirebaseJsonConfig());
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
    this.firestore.getDoc('Pedidos', this.id, params => {
      this.firePedido = params;
      const pedido = params as Pedido;
      this.firestore.getDoc('Usuarios', pedido.clienteID, c => {
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
    this.popup.showSuccessPopup('Notificación enviada');

    this.pedido.estado = "Finalizado";
    this.pedido.estadoColor = this.estadosColor[2];
    this.firePedido.estado = 2;
    const {id, ...pedido} = this.firePedido;
    this.firestore.updateDoc("Pedidos", this.id, pedido);
  }

}
