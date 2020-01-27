import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class IpPcService {

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

  getIp() {
    return this.http.get<{ip: string}>('https://jsonip.com');
  }
}
