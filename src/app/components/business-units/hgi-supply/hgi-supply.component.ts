import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../../footer/footer.component';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-hgi-supply',
  standalone: true,
  imports: [NgOptimizedImage, MatListModule, FooterComponent, MenuComponent],
  providers: [],
  templateUrl: './hgi-supply.component.html',
  styleUrls: ['./hgi-supply.component.scss'],
})
export class HgiSupplyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
