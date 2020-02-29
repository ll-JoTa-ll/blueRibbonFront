import { Component, OnInit } from '@angular/core';
import { VisanetService } from '../../services/visanet.service';
import { BlueRibbonService } from '../../services/blue-ribbon.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { IpPcService } from '../../services/ip-pc.service';
import { BoletoService } from '../../services/boleto.service';

@Component({
  selector: 'app-visa-pay-complete',
  templateUrl: './visa-pay-complete.component.html',
  styleUrls: ['./visa-pay-complete.component.sass']
})
export class VisaPayCompleteComponent implements OnInit {

  data_token;
  data_ticket;
  serviceNumber: string;
  nombrePasajero: string;
  emailPasajero: string;
  pnrPasajero: string;
  listTotal: any[] = [];
  fecHora;
  numTransaccion;
  numTarjeta;

  constructor(
    private visanetService: VisanetService,
    private blueRibbonService: BlueRibbonService,
    private spinner: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private boletoService: BoletoService,
  ) {
    console.log("VisaPayCompleteComponent constructor");
    this.data_token = this.sessionStorageService.retrieve('ss_data_token');
    this.data_ticket = this.sessionStorageService.retrieve('ss_data_ticket');
    this.serviceNumber = "Test";
    this.nombrePasajero = "Test";
    this.emailPasajero = "Test";
    this.pnrPasajero = "Test";
  }

  ngOnInit() {
    let flagPurchaseBillMeLater = 1;
    console.log("VisaPayCompleteComponent ngOnInit");
    const id_sms_detalle = this.data_ticket.id_sms_detalle;
    this.spinner.show();
    this.boletoService.getListSmsSend(3).subscribe(
      result => {
        console.log("buscarSmsEnviados result: " + JSON.stringify(result));
        if (result.status === 1) {
          this.listTotal = result.list;
          this.listTotal.forEach(function(item) {
            if (item.id_sms_detalle === id_sms_detalle) {
              flagPurchaseBillMeLater = 0;
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
        if (flagPurchaseBillMeLater === 1) {
          this.purchaseBillMeLater();
        }
      }
    );
  }

  purchaseBillMeLater() {
    console.log("purchaseBillMeLater INI");
    let statusBrb = 0;
    this.spinner.show();
    const data = {
      "idSMSDet": this.data_ticket.id_sms_detalle,
      "ProductCode":"GOLD",
      "IsInternational":true,
      "PromoCode":"",
      "UserLogin":"",
      "UserPassword":"",
      "CustomerReferenceNumber":"",
      "ReplaceServiceNumberWithCRN":false,
      "FlightDetails":"Flight Details",
      "DepartureDt":  this.data_ticket.fechaSalida,//"10/20/2018 2:22:22 AM",
      "LastArrivalDt":  this.data_ticket.fechaLlegada,//"10/21/2018 2:22:22 PM",
      "CurrencyCode":"USD",
      "AgentEmailSend": "juan.caro.1987@gmail.com",
      "PassengerList":[
        {
          "OrderSequence": 1,
          "LastName": (this.data_ticket.apellidoCliente + ' - ' + this.data_token.purchaseNumber),
          "FirstName": this.data_ticket.nombreCliente,
          "Email": this.data_ticket.correo,
          "AirlineCode": this.data_ticket.airLineCode,
          "AirlineCodeType":"IATA",
          "AirlineConfirmationNumber": this.data_ticket.airLineConfirmationNumber,
        }
      ]
    };

    console.log("data: " + JSON.stringify(data));

    this.blueRibbonService.purchaseBillMeLater(data).subscribe(
      result => {
        console.log(JSON.stringify(result));
        if (result.status === 1) {
          statusBrb = 1;
          this.nombrePasajero = this.data_ticket.nombreCliente;
          this.emailPasajero = this.data_ticket.correo;
          this.serviceNumber = result.serviceNumber
        }
      },
      err => {
        this.spinner.hide();
        //this.router.navigate(['/br-finish']);
        console.log('ERROR: ' + JSON.stringify(err));
      },
      () => {
        this.spinner.hide();
        //this.router.navigate(['/br-finish']);
        console.log('purchaseBillMeLater COMPLETADO');

        //Datos de VISA
        console.log("this.data_ticket.id_sms_detalle: " + this.data_ticket.id_sms_detalle);
        this.spinner.show();
        if (statusBrb === 1) {
          let dataPn = {
            'purchaseNumber': "" + this.data_ticket.id_sms_detalle,
            'codSistema': 'BRB'
          };
          this.visanetService.getByPurchaseNumber(dataPn).subscribe(
            result => {
              if (result.status === 1) {
                  const LstVisa = result.list;
                  const dataVisaTrans = LstVisa[LstVisa.length - 1];
                  const fecha = dataVisaTrans.fechaRegistro.split('-');
                  const dia = fecha[2].substring(0, 2);
                  const mes = fecha[1];
                  const anho = fecha[0];
                  const hora = dataVisaTrans.fechaRegistro.split('T')[1];
                  this.fecHora = dia + "/" + mes + "/" + anho + " " + hora.substring(0, 5) + "h";
                  this.numTransaccion = dataVisaTrans.transactionId;
                  this.numTarjeta = dataVisaTrans.card;
              }
            },
            err => {
              this.spinner.hide();
              //this.router.navigate(['/br-finish']);
              console.log('ERROR: ' + JSON.stringify(err));
            },
            () => {
              this.spinner.hide();
              //this.router.navigate(['/br-finish']);
              console.log('getByPurchaseNumber COMPLETADO');
            }
          );
        }
      }
    );
  }


}
