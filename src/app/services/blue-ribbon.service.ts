import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';

interface IPurchaseBillMeLaterResult {
  status: number;
  message: string;
  serviceNumber: string;
}

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class BlueRibbonService {

  private _url_br: string = environment.url_br + "/sendsms/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Basic " + environment.token_br,
      'Content-Type': "application/json",
    });
  }

  purchaseBillMeLater(data): Observable<IPurchaseBillMeLaterResult> {
    return this.http.post<IPurchaseBillMeLaterResult>(this._url_br + 'purchaseBillMeLater', data);
  }
}
