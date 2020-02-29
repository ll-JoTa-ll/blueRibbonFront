import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  model: any = {};
  production = environment.production;
  dateObj = new Date(200228210453 * 100);

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private loginService: LoginService
  ) {
    console.log(this.dateObj);
  }

  ngOnInit() {
  }

  login() {
    if (this.production === true) {
      location.href = '/domiblue/send-sms';
    } else {
      location.href = "/send-sms";
    }

    //this.router.navigate(['/send-sms']);
    /*
    this.spinner.show();
    this.loginService.login(this.model).subscribe(
      result => {
        console.log('result: ' + JSON.stringify(result));
        if (result.status === 1) {
          this.router.navigate(['/send-sms']);
        }
      },
      err => {
        this.spinner.hide();
        console.log('ERROR: ' + JSON.stringify(err));
      },
      () => {
        console.log('login completado');
      }
    );
    */
  }

}
