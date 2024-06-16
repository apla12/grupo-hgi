import { HgiConsultoriaComponent } from './components/business-units/hgi-consultoria/hgi-consultoria.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HgiSupplyComponent } from './components/business-units/hgi-supply/hgi-supply.component';
import { HgiEducacionalComponent } from './components/business-units/hgi-educacional/hgi-educacional.component';
import { HgiMktComponent } from './components/business-units/hgi-mkt/hgi-mkt.component';
import { HgiSegurancaTrabalhoComponent } from './components/business-units/hgi-seguranca-trabalho/hgi-seguranca-trabalho.component';
import { HgiGestaoObrasComponent } from './components/business-units/hgi-gestao-obras/hgi-gestao-obras.component';
import { HgiServicosEspeciaisComponent } from './components/business-units/hgi-servicos-especiais/hgi-servicos-especiais.component';
import { HgiIndustrialComponent } from './components/business-units/hgi-industrial/hgi-industrial.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'hgi-supply',
    component: HgiSupplyComponent,
  },
  {
    path: 'hgi-consultoria',
    component: HgiConsultoriaComponent,
  },
  {
    path: 'hgi-educacional',
    component: HgiEducacionalComponent,
  },
  {
    path: 'hgi-mkt',
    component: HgiMktComponent,
  },
  {
    path: 'hgi-seguranca-trabalho',
    component: HgiSegurancaTrabalhoComponent,
  },
  {
    path: 'hgi-gestao-obras',
    component: HgiGestaoObrasComponent,
  },
  {
    path: 'hgi-servicos-especiais',
    component: HgiServicosEspeciaisComponent,
  },
  {
    path: 'hgi-industrial',
    component: HgiIndustrialComponent,
  },
];
