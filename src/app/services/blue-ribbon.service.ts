import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class BlueRibbonService {

  private _url_br: string = environment.url_br + "/Service/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Basic " + environment.token_br,
      'Content-Type': "application/json",
    });
  }

  purchaseBillMeLater(data) {
    return this.http.post(this._url_br + 'Purchase', data);
  }
}
