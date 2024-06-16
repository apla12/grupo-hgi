import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-hgi-seguranca-trabalho',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent],
  providers: [],
  templateUrl: './hgi-seguranca-trabalho.component.html',
  styleUrls: ['./hgi-seguranca-trabalho.component.scss']
})
export class HgiSegurancaTrabalhoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
