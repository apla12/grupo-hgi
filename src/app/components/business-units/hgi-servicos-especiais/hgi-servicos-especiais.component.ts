import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-hgi-servicos-especiais',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent],
  providers: [],
  templateUrl: './hgi-servicos-especiais.component.html',
  styleUrls: ['./hgi-servicos-especiais.component.scss'],
})
export class HgiServicosEspeciaisComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
