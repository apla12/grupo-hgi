import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-hgi-mkt',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent],
  providers: [],
  templateUrl: './hgi-mkt.component.html',
  styleUrls: ['./hgi-mkt.component.scss'],
})
export class HgiMktComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
