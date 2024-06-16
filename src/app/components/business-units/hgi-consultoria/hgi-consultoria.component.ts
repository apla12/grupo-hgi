import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hgi-consultoria',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent],
  providers: [],
  templateUrl: './hgi-consultoria.component.html',
  styleUrls: ['./hgi-consultoria.component.scss']
})
export class HgiConsultoriaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
