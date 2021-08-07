import { Component, OnInit } from '@angular/core';
import {Tienda, Vendedor} from '../models';
import {ApiService} from '../services';
import {Suscripcion} from '../models/Vendedor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss']
})
export class TiendasComponent implements OnInit {

  tiendas: Tienda[];

  constructor(private router: Router, private apiService: ApiService) {
    this.tiendas = [] as Tienda[];
  }

  ngOnInit(): void {
    this.apiService
      .getTiendas()
      .subscribe((result: Tienda[]) => {
        this.tiendas = result as Tienda[];
      });
  }

  toTiendaDetail(id: string): void {
    this.router.navigate(['/admin/tiendas/' + id]);
  }

}
