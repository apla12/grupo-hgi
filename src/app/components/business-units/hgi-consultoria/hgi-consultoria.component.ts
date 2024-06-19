import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NgOptimizedImage } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-hgi-consultoria',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent, MatTabsModule],
  providers: [],
  templateUrl: './hgi-consultoria.component.html',
  styleUrls: ['./hgi-consultoria.component.scss']
})
export class HgiConsultoriaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
