import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { ICargarTokenModel } from '../models/ICargarToken.model';
import { IListVisaByPn } from '../models/IListVisaByPn';

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class VisanetService {

  private _url_visa: string = environment.url_visa + "/visa/";
  private key_visa = environment.key_visa;

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
  }

  getSessionToken(data): Observable<ICargarTokenModel> {
    httpOptions2.headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.key_visa
    });
    return this.http.post<ICargarTokenModel>(this._url_visa + 'CargarToken', data, httpOptions2);
  }

  autorizarTransaccion(data) {
    httpOptions2.headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.key_visa
    });
    return this.http.post<ICargarTokenModel>(this._url_visa + 'AutorizarTransaccion', data, httpOptions2);
  }

  getByPurchaseNumber(data): Observable<IListVisaByPn> {
    httpOptions2.headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.key_visa
    });
    return this.http.post<IListVisaByPn>(this._url_visa + 'ListaXpurchaseNumber', data, httpOptions2);
  }
}
