import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {EnvioComponent} from './components/envio/envio.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'send-sms', component: EnvioComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
