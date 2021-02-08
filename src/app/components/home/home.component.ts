import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private fragment: string;

  constructor(private route: ActivatedRoute) {
    this.fragment = '';
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    try {
      const el = document.querySelector('#' + this.fragment);
      if (el) {
        el.scrollIntoView();
      }
    } catch (e) { }
  }

}
