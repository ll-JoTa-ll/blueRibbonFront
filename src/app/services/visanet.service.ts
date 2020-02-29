import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { ICargarTokenModel } from '../models/ICargarToken.model';
import { IListVisaByPn } from '../models/IListVisaByPn';

@Injectable({
  providedIn: 'root'
})
export class VisanetService {

  private _url_visa: string = environment.url_visa + "/visa/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
  }

  getSessionToken(data): Observable<ICargarTokenModel> {
    return this.http.post<ICargarTokenModel>(this._url_visa + 'CargarToken', data);
  }

  autorizarTransaccion(data) {
    return this.http.post<ICargarTokenModel>(this._url_visa + 'AutorizarTransaccion', data);
  }

  getByPurchaseNumber(data): Observable<IListVisaByPn> {
    return this.http.post<IListVisaByPn>(this._url_visa + 'ListaXpurchaseNumber', data);
  }
}
