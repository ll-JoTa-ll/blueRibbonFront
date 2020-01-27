import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ILoginUserModel } from '../models/ILoginUser.model';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url2: string = environment.url2 + "/auth/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
    });
  }

  login(data): Observable<ILoginUserModel> {
    return this.http.post<ILoginUserModel>(this._url2 + '', data, httpOptions);
  }
}
