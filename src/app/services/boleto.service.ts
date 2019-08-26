import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IBoletoModel } from '../models/IBoleto.model';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  private _url: string = environment.url + "/BoletosReporte/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

  getBoletoReporte(): Observable<IBoletoModel> {
    return this.http.post<IBoletoModel>(this._url + "getBoletoReporte", null);
  }
}
