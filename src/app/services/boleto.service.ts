import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IBoletoModel } from '../models/IBoleto.model';
import { ITicketModel } from '../models/ITicket.model';
import { IListSmsSend } from '../models/IListSmsSend';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  private _url: string = environment.url + "/BoletosReporte/";
  private _url2: string = environment.url2 + "/sendsms/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

  getBoletoReporte(): Observable<IBoletoModel> {
    return this.http.post<IBoletoModel>(this._url + "getBoletoReporte", null);
  }

  sendSms(dataPost) {
    console.log("sendSms");
    console.log("dataPost: " + JSON.stringify(dataPost));
    return this.http.post(this._url2 + 'enviarboletos', dataPost);
  }

  getTicket(id): Observable<ITicketModel> {
    return this.http.get<ITicketModel>(this._url2 + 'GetDetxID/' + id);
  }

  getListSmsSend(estado): Observable<IListSmsSend> {
    return this.http.get<IListSmsSend>(this._url2 + "GetLista/" + estado);
  }

  getListaActivos(): Observable<IListSmsSend> {
    return this.http.get<IListSmsSend>(this._url2 + "GetListaActivos");
  }

  updateEstadoSMS(dataPost) {
    return this.http.post(this._url2 + "updateEstadoSMS", dataPost);
  }
}
