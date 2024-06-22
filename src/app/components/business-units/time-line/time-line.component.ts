import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  providers: [],
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
