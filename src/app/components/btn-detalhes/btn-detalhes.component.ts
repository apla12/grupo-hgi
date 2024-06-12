import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-btn-detalhes',
  standalone: true,
  imports: [NgOptimizedImage, MatCardModule, MatIconModule],
  providers: [],
  templateUrl: './btn-detalhes.component.html',
  styleUrls: ['./btn-detalhes.component.scss'],
})
export class BtnDetalheComponent implements OnInit {
  link: any;

  constructor() {}

  ngOnInit(): void {
  }
}
