import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {EnvioComponent} from './components/envio/envio.component';
import {InfoBoletoPassComponent} from './components/info-boleto-pass/info-boleto-pass.component';
import {BlueRibbomFinishComponent} from './components/blue-ribbom-finish/blue-ribbom-finish.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'send-sms', component: EnvioComponent, runGuardsAndResolvers: 'always' },
  { path: 'pass-ticket/:id', component: InfoBoletoPassComponent, runGuardsAndResolvers: 'always' },
  { path: 'br-finish', component: BlueRibbomFinishComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
