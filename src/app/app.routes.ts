import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HgiSupplyComponent } from './components/business-units/hgi-supply/hgi-supply.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'hgi-supply',
    component: HgiSupplyComponent,
  },
  // {
  //   path: 'eletrica-predial',
  //   component: EletricaPredialComponent,
  // },
  // {
  //   path: 'hidraulica-predial',
  //   component: HidraulicaPredialComponent,
  // },
  // {
  //   path: 'infraestrutura-eletrica',
  //   component: InfraEstruturaEletricaComponent,
  // },
  // {
  //   path: 'infraestrutura-hidraulica',
  //   component: InfraEstruturaHidraulicaComponent,
  // },
  // {
  //   path: 'sistema-gas',
  //   component: SistemaGasComponent,
  // },
];
