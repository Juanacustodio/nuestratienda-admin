import { Component, OnInit } from '@angular/core';
import {Vendedor} from '../models';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services';
import {PopupHelper} from '../helpers';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss']
})
export class VendedorComponent implements OnInit {

  vendedorId: number;
  vendedor: Vendedor;
  popup = new PopupHelper();

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    this.activatedRoute.params.subscribe(params => {
      this.vendedorId = params.id;
    });
    this.vendedor = {} as Vendedor;
  }

  ngOnInit(): void {
    this.apiService
      .getVendedor(this.vendedorId)
      .subscribe((result: Vendedor) => {
        this.vendedor = result as Vendedor;
      });
  }

  guardarVendedor(): void {
    this.apiService
      .updateVendedor(this.vendedor)
      .subscribe((result: any) => {
        this.popup.showSuccessPopup('Actualización exitosa');
      });
  }

}
