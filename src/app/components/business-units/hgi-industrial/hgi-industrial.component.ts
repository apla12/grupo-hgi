import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-hgi-industrial',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent],
  providers: [],
  templateUrl: './hgi-industrial.component.html',
  styleUrls: ['./hgi-industrial.component.scss']
})
export class HgiIndustrialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
