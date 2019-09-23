import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../../services/boleto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { ITicketPasajeroModel } from '../../models/ITicketPasajero.model';
import { BlueRibbonService } from '../../services/blue-ribbon.service';

@Component({
  selector: 'app-info-boleto-pass',
  templateUrl: './info-boleto-pass.component.html',
  styleUrls: ['./info-boleto-pass.component.sass']
})
export class InfoBoletoPassComponent implements OnInit {

  pasajeroBoleto: ITicketPasajeroModel;
  id;

  constructor(
    private boletoService: BoletoService,
    private spinner: NgxSpinnerService,
    private rutaActiva: ActivatedRoute,
    private blueRibbonService: BlueRibbonService
  ) { }

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    this.getTicket(this.id);
  }

  getTicket(id) {
    this.spinner.show();
    this.boletoService.getTicket(id).subscribe(
      result => {
        console.log(result);
        if (result.status === 1) {
          this.pasajeroBoleto = result.ticket;
        } else {}
      },
      err => {
        this.spinner.hide();
        console.log('ERROR: ' + JSON.stringify(err));
      },
      () => {
        this.spinner.hide();
        console.log('getTicket completado');
      }
    );
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
            "Email": "",
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
        console.log('ERROR: ' + JSON.stringify(err));
      },
      () => {
        console.log('purchaseBillMeLater completado');
      }
    );
  }

}
