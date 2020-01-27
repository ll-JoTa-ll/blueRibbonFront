import { Component, OnInit } from '@angular/core';
import { VisanetService } from '../../services/visanet.service';
import { BlueRibbonService } from '../../services/blue-ribbon.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import {IpPcService} from '../../services/ip-pc.service';

@Component({
  selector: 'app-visa-pay-complete',
  templateUrl: './visa-pay-complete.component.html',
  styleUrls: ['./visa-pay-complete.component.sass']
})
export class VisaPayCompleteComponent implements OnInit {

  data_token;
  data_ticket;

  constructor(
    private visanetService: VisanetService,
    private blueRibbonService: BlueRibbonService,
    private spinner: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) {
    console.log("VisaPayCompleteComponent constructor");
    this.data_token = this.sessionStorageService.retrieve('ss_data_token');
    this.data_ticket = this.sessionStorageService.retrieve('ss_data_ticket');
  }

  ngOnInit() {
    console.log("VisaPayCompleteComponent ngOnInit");
    this.purchaseBillMeLater();
  }

  purchaseBillMeLater() {
    console.log("purchaseBillMeLater INI");
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
      }
    );
  }


}
