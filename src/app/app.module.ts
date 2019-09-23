import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EnvioComponent } from './components/envio/envio.component';
import { FormsModule } from '@angular/forms';
import { InfoBoletoPassComponent } from './components/info-boleto-pass/info-boleto-pass.component';
import { BlueRibbomFinishComponent } from './components/blue-ribbom-finish/blue-ribbom-finish.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnvioComponent,
    InfoBoletoPassComponent,
    BlueRibbomFinishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    NgxSpinnerModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
