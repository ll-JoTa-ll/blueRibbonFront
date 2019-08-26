import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
  }

}
