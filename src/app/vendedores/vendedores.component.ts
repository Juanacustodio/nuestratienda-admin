import { Component, OnInit } from '@angular/core';
import {Tienda, Vendedor} from '../models';
import {Router} from '@angular/router';
import {ApiService} from '../services';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss']
})
export class VendedoresComponent implements OnInit {

  vendedores: Vendedor[];

  constructor(private router: Router, private apiService: ApiService) {
    this.vendedores = [] as Vendedor[];
  }

  ngOnInit(): void {
    this.apiService
      .getVendedores()
      .subscribe((result: Vendedor[]) => {
        console.log(result)
        this.vendedores = result as Vendedor[];
      });
  }

  toVendedorDetail(id: any): void {
    this.router.navigate(['/admin/vendedores/' + id]);
  }

}
