import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BtnDetalheComponent } from '../btn-detalhes/btn-detalhes.component';

@Component({
  selector: 'app-business-units',
  standalone: true,
  imports: [NgOptimizedImage, BtnDetalheComponent],
  providers: [],
  templateUrl: './business-units.component.html',
  styleUrls: ['./business-units.component.scss']
})
export class BusinessUnitsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
