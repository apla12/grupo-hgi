import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-hgi-supply',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatListModule,
    FooterComponent,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  templateUrl: './hgi-supply.component.html',
  styleUrls: ['./hgi-supply.component.scss'],
})
export class HgiSupplyComponent {

  isLinear = false;

  constructor() {}
}
