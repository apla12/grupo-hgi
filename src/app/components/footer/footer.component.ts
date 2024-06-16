import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { merge } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  nome = new FormControl('', [Validators.required]);
  mensagem = new FormControl('', [Validators.required]);
  errorMessage = '';

  constructor() {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.nome.statusChanges,
      this.nome.valueChanges,
      this.mensagem.statusChanges,
      this.mensagem.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.nome.hasError('required')) {
      this.errorMessage = 'Campo obrigatório.';
    }
    if (this.mensagem.hasError('required')) {
      this.errorMessage = 'Campo obrigatório.';
    }
    if (this.email.hasError('required')) {
      this.errorMessage = 'Campo obrigatório.';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Este e-mail não é válido.';
    } else {
      this.errorMessage = '';
    }
  }
}
