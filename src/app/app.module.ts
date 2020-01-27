import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EnvioComponent } from './components/envio/envio.component';
import { FormsModule } from '@angular/forms';
import { InfoBoletoPassComponent } from './components/info-boleto-pass/info-boleto-pass.component';
import { BlueRibbomFinishComponent } from './components/blue-ribbom-finish/blue-ribbom-finish.component';
import { EnvioSmsCompletadoComponent } from './components/envio-sms-completado/envio-sms-completado.component';
import { VisaDatosComponent } from './components/visa-datos/visa-datos.component';
import { VisaPayCompleteComponent } from './components/visa-pay-complete/visa-pay-complete.component';
import { VisaTimeoutComponent } from './components/visa-timeout/visa-timeout.component';
import { VisaBotonJsComponent } from './components/visa-boton-js/visa-boton-js.component';
import { VisaErrorComponent } from './components/visa-error/visa-error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnvioComponent,
    InfoBoletoPassComponent,
    BlueRibbomFinishComponent,
    EnvioSmsCompletadoComponent,
    VisaDatosComponent,
    VisaPayCompleteComponent,
    VisaTimeoutComponent,
    VisaBotonJsComponent,
    VisaErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    NgxSpinnerModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
