import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage],
  providers: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
