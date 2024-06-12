import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BtnDetalheComponent } from './../btn-detalhes/btn-detalhes.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-business-units',
  standalone: true,
  imports: [NgOptimizedImage, BtnDetalheComponent, RouterLink],
  providers: [],
  templateUrl: './business-units.component.html',
  styleUrls: ['./business-units.component.scss'],
})
export class BusinessUnitsComponent implements OnInit {
  hgiSupply = '';

  constructor() {}

  ngOnInit() {}
}
