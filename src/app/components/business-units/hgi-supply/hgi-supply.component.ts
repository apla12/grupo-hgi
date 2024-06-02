import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-hgi-supply',
  standalone: true,
  imports: [NgOptimizedImage, MatListModule],
  providers: [],
  templateUrl: './hgi-supply.component.html',
  styleUrls: ['./hgi-supply.component.scss'],
})
export class HgiSupplyComponent implements OnInit {
  constructor() {}

  ngOnInit() {

   }


}
