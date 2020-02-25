import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale, esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
defineLocale('de', deLocale);

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
import { SmsDetalleComponent } from './components/sms-detalle/sms-detalle.component';
import { DateShortPipe } from './pipes/date-short.pipe';

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
    VisaErrorComponent,
    SmsDetalleComponent,
    DateShortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    NgxSpinnerModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
