import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {EnvioComponent} from './components/envio/envio.component';
import {InfoBoletoPassComponent} from './components/info-boleto-pass/info-boleto-pass.component';
import {BlueRibbomFinishComponent} from './components/blue-ribbom-finish/blue-ribbom-finish.component';
import {VisaDatosComponent} from './components/visa-datos/visa-datos.component';
import {VisaPayCompleteComponent} from './components/visa-pay-complete/visa-pay-complete.component';
import {VisaTimeoutComponent} from './components/visa-timeout/visa-timeout.component';
import {VisaBotonJsComponent} from './components/visa-boton-js/visa-boton-js.component';
import {VisaErrorComponent} from './components/visa-error/visa-error.component';

const routes: Routes = [
  { path: '', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'send-sms', component: EnvioComponent, runGuardsAndResolvers: 'always' },
  { path: 'pass-ticket/:id', component: InfoBoletoPassComponent, runGuardsAndResolvers: 'always' },
  { path: 'br-finish', component: BlueRibbomFinishComponent, runGuardsAndResolvers: 'always' },
  { path: 'visa-datos', component: VisaDatosComponent, runGuardsAndResolvers: 'always' },
  { path: 'visa-fin', component: VisaPayCompleteComponent, runGuardsAndResolvers: 'always' },
  { path: 'visa-timeout', component: VisaTimeoutComponent, runGuardsAndResolvers: 'always' },
  { path: 'boton_js', component: VisaBotonJsComponent, runGuardsAndResolvers: 'always' },
  { path: 'visa-error', component: VisaErrorComponent, runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
