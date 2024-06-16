import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-hgi-educacional',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent],
  providers: [],
  templateUrl: './hgi-educacional.component.html',
  styleUrls: ['./hgi-educacional.component.scss']
})
export class HgiEducacionalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
