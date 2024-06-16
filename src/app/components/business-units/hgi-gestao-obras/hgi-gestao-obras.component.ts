import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-hgi-gestao-obras',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent],
  providers: [],
  templateUrl: './hgi-gestao-obras.component.html',
  styleUrls: ['./hgi-gestao-obras.component.scss']
})
export class HgiGestaoObrasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
