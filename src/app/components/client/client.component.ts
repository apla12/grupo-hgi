import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NgOptimizedImage],
  providers: [],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  accordionsClient(_event: any) {
    const target = _event.target.closest('.card');

    if (!target) return;

    document
      .querySelector('.container')
      ?.querySelectorAll('.card')
      .forEach((card) => {
        card.classList.remove('active');
      });

    target.classList.add('active');
  }
}
