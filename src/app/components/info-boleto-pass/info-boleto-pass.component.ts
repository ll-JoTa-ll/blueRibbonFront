import { Component, OnInit, TemplateRef } from '@angular/core';
import { BoletoService } from '../../services/boleto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ITicketPasajeroModel } from '../../models/ITicketPasajero.model';
import { BlueRibbonService } from '../../services/blue-ribbon.service';
import { VisanetService } from '../../services/visanet.service';
import { environment } from '../../../environments/environment';
import { IpPcService } from '../../services/ip-pc.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-info-boleto-pass',
  templateUrl: './info-boleto-pass.component.html',
  styleUrls: ['./info-boleto-pass.component.sass']
})
export class InfoBoletoPassComponent implements OnInit {

  pasajeroBoleto: ITicketPasajeroModel;
  id;
  flagDatos = false;
  sessionKey: string;
  expirationTime: string;
  urlJs = "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true";
  flagValidar = true;
  ip;
  purchaseNumber: string;
  aceptarTC: boolean;
  modalRefTC: BsModalRef;
  fecha1;
  fecha2;
  listTotal: any[] = [];
  model: any = {};
  valIni = false;

  constructor(
    private boletoService: BoletoService,
    private spinner: NgxSpinnerService,
    private rutaActiva: ActivatedRoute,
    private blueRibbonService: BlueRibbonService,
    private router: Router,
    private visanetService: VisanetService,
    private ipPcService: IpPcService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService,
  ) {
    //this.purchaseNumber = '21';
    this.aceptarTC = false;
    this.getIp();
  }

  ngOnInit() {
    let flagPurchaseBillMeLater = 0;
    this.id = this.rutaActiva.snapshot.params.id;
    this.purchaseNumber = this.id;
    const purchaseNumber  = this.purchaseNumber;
    this.spinner.show();
    this.boletoService.getListSmsSend(1).subscribe(
      result => {
        console.log("buscarSmsEnviados result: " + JSON.stringify(result));
        if (result.status === 1) {
          this.listTotal = result.list;
          this.listTotal.forEach(function(item) {
            console.log("item.id_sms_detalle: " + item.id_sms_detalle);
            console.log("purchaseNumber: " + purchaseNumber);
            if (item.id_sms_detalle == purchaseNumber) {
              flagPurchaseBillMeLater = 1;
              if (item.activo == 0) {
                  flagPurchaseBillMeLater = 0;
              }
              console.log("flagPurchaseBillMeLater: " + flagPurchaseBillMeLater);
            }
          });
        }
      },
      error => {
        console.log("buscarSmsEnviados ERROR: " + JSON.stringify(error));
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        console.log("flagPurchaseBillMeLater: " + flagPurchaseBillMeLater);
        if (flagPurchaseBillMeLater === 1) {
          this.getTicket(this.id);
        } else {
          this.router.navigate(['/pass-ticket-sin']);
        }
      }
    );
    //this.getTicket(this.id);
  }

  getIp() {
    console.log("getIp INI");
    this.ipPcService.getIp().subscribe(
      result => {
        console.log(result);
        this.ip = result.ip;
        console.log('this.ip: ' + this.ip);
      },
      error => {
        console.log("ERROR");
        console.log(JSON.stringify(error));
      },
      () => {
        console.log("getIp completado");
      }
    );
  }

  getTicket(id) {
    this.spinner.show();
    this.boletoService.getTicket(id).subscribe(
      result => {
        console.log(result);
        if (result.status === 1) {
          this.pasajeroBoleto = result.ticket;
          const fecha1 = this.pasajeroBoleto.fechaSalida.substring(0, 10).split('/');
          const fecha2 = this.pasajeroBoleto.fechaLlegada.substring(0, 10).split('/');
          this.fecha1 = fecha1[1] + "/" + fecha1[0] + "/" + fecha1[2];
          this.fecha2 = fecha2[1] + "/" + fecha2[0] + "/" + fecha2[2];
          this.sessionStorageService.store('ss_data_ticket', this.pasajeroBoleto);
        } else {}
      },
      err => {
        this.spinner.hide();
        console.log('ERROR: ' + JSON.stringify(err));
      },
      () => {
        this.flagDatos = true;
        this.valIni = true;
        this.spinner.hide();
        console.log('getTicket completado');
      }
    );
  }

  openModalTC(template: TemplateRef<any>) {
    this.modalRefTC = this.modalService.show(template);
  }

  validacionVisa() {
    this.spinner.show();
    const data = {
      "sesionVisa":
        {
          "channel": "web",
          "amount": 1.00,
          "recurrenceMaxAmount": 1.00,
          "antifraud":
            {
              "clientIp": this.ip,
              "merchantDefineData":
                {
                  "MDD33": "DNI",
                  "MDD34": '44211032', //this.pasajeroBoleto.docIdentidad
                  "MDD70": "NO",
                  "MDD75": "Invitado"
                }
            }
        },
      "merchantId": "2",
      "sistema": "BlueRibbon",
      "tabla": "t_sendsms_detalle",
      "idtabla": this.id,
      "nombre": this.model.name, //this.pasajeroBoleto.nombreCliente
      "apellido": this.model.lastname, //this.pasajeroBoleto.apellidoCliente
      "tipodoc": "DNI",
      "numdoc": "44211032", //this.pasajeroBoleto.docIdentidad
      "customerEmail": this.model.email,
      "currency": "USD",
      "productId": "341198214",
      "purchaseNumber": this.purchaseNumber,
      "codSistema": "BRB"
    };

    this.sessionStorageService.store('ss_data_token', data);

    let flagStatus = 0;
    this.visanetService.getSessionToken(data).subscribe(
      result => {
        console.log(JSON.stringify(result));
        if (result.status === 1) {
          flagStatus = 1;
          this.sessionKey = result.sesion.sessionKey;
          this.expirationTime = result.sesion.expirationTime;
        }
      },
      err => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        if (flagStatus === 1) {
          this.flagValidar = false;
          this.generarBoton(this.sessionKey);
        }
      }
    );
  }

  generarBoton(sessionKey) {
    let form = document.createElement("form");
    form.setAttribute('method', "post");
    form.setAttribute('action', environment.url_visa_auth);
    form.setAttribute('id', "boton_pago");
    document.getElementById("btn_pago").appendChild(form);

    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', this.urlJs);
    scriptEl.setAttribute('data-sessiontoken', sessionKey);
    scriptEl.setAttribute('data-merchantid', '115015006');
    scriptEl.setAttribute('data-purchasenumber', this.purchaseNumber);
    scriptEl.setAttribute('data-channel', 'web');
    scriptEl.setAttribute('data-amount', '1');
    scriptEl.setAttribute('data-cardholdername', this.model.name);
    scriptEl.setAttribute('data-cardholderlastname', this.model.lastname);
    scriptEl.setAttribute('data-cardholderemail', this.model.email);
    scriptEl.setAttribute('data-expirationminutes', '20');
    scriptEl.setAttribute('data-timeouturl', environment.visa_timeouturl);
    document.getElementById("boton_pago").appendChild(scriptEl);
  }

  purchaseBillMeLater() {
    this.spinner.show();
    const data = {
      "ProductCode": "DIAMOND",
      "IsInternational": true,
      "PromoCode": "",
      "UserLogin": "",
      "UserPassword": "",
      "CustomerReferenceNumber": "",
      "ReplaceServiceNumberWithCRN": false,
      "FlightDetails": "Test text for Flight Details",
      "DepartureDt": "10/20/2018 2:22:22 AM",
      "LastArrivalDt": "10/21/2018 2:22:22 PM",
      "CurrencyCode": "USD",
      "AgentEmailSend": "",
      "PassengerList":
        [
          {
            "OrderSequence": 1,
            "LastName": this.pasajeroBoleto.apellidoCliente,
            "FirstName": this.pasajeroBoleto.nombreCliente,
            "Email": "juan.caro.1987@gmail.com",
            "AirlineCode": "AA",
            "AirlineCodeType": "IATA",
            "AirlineConfirmationNumber": "APICNF123"
          }
        ]
    };
    this.blueRibbonService.purchaseBillMeLater(data).subscribe(
      result => {
        console.log(result);
      },
      err => {
        this.spinner.hide();
        this.router.navigate(['/br-finish']);
        console.log('ERROR: ' + JSON.stringify(err));
      },
      () => {
        this.spinner.hide();
        this.router.navigate(['/br-finish']);
        console.log('purchaseBillMeLater completado');
      }
    );
  }

  changeTC() {
    if (this.aceptarTC === true) {
      let flagValCampos = 0;
      if (this.model.name == "" || this.model.name == undefined || this.model.name.length == 0) {
        this.aceptarTC = false;
        $("#chbxAtc").prop("checked", false);
        flagValCampos++;
        $("#txtName").addClass("campo-invalido");
      } else {
        $("#txtName").removeClass("campo-invalido");
      }
      if (this.model.lastname == "" || this.model.lastname == undefined || this.model.lastname.length == 0) {
        this.aceptarTC = false;
        $("#chbxAtc").prop("checked", false);
        flagValCampos++;
        $("#txtLastName").addClass("campo-invalido");
      } else {
        $("#txtLastName").removeClass("campo-invalido");
      }
      if (this.model.email == "" || this.model.email == undefined || this.model.email.length == 0) {
        this.aceptarTC = false;
        $("#chbxAtc").prop("checked", false);
        flagValCampos++;
        $("#txtEmail").addClass("campo-invalido");
      } else {
        $("#txtEmail").removeClass("campo-invalido");
      }

      if (flagValCampos > 0) {
        return false;
      }

      $("#btnPagaAqui").hide();
      this.validacionVisa();
    }
  }

}
