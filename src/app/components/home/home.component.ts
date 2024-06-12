import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { BusinessUnitsComponent } from '../business-units/business-units.component';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MenuComponent,
    HeaderComponent,
    AboutComponent,
    BusinessUnitsComponent,
    ClientComponent,
    ContactComponent,
    FooterComponent,
  ],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
