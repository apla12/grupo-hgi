import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-detalhes',
  standalone: true,
  imports: [NgOptimizedImage, MatCardModule, MatIconModule, RouterLink],
  providers: [],
  templateUrl: './btn-detalhes.component.html',
  styleUrls: ['./btn-detalhes.component.scss'],
})
export class BtnDetalheComponent {
  constructor() {}
}
