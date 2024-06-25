import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-hgi-seguranca-trabalho',
  standalone: true,
  imports: [NgOptimizedImage, MatListModule, FooterComponent],
  providers: [],
  templateUrl: './hgi-seguranca-trabalho.component.html',
  styleUrls: ['./hgi-seguranca-trabalho.component.scss'],
})
export class HgiSegurancaTrabalhoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
