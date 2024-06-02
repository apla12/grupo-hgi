import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-units',
  standalone: true,
  imports: [NgOptimizedImage],
  providers: [],
  templateUrl: './business-units.component.html',
  styleUrls: ['./business-units.component.scss']
})
export class BusinessUnitsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
