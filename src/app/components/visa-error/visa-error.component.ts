import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { VisanetService } from '../../services/visanet.service';
import { BlueRibbonService } from '../../services/blue-ribbon.service';
import { BoletoService } from '../../services/boleto.service';

@Component({
  selector: 'app-visa-error',
  templateUrl: './visa-error.component.html',
  styleUrls: ['./visa-error.component.sass']
})
export class VisaErrorComponent implements OnInit {

  data_ticket;
  fecHora;
  errorMessage;

  constructor(
    private spinner: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private visanetService: VisanetService,
    private blueRibbonService: BlueRibbonService,
    private boletoService: BoletoService
  ) {
    console.log("VisaErrorComponent constructor");
    this.data_ticket = this.sessionStorageService.retrieve('ss_data_ticket');
  }

  ngOnInit() {
    console.log("VisaErrorComponent ngOnInit");
    const id_sms_detalle = this.data_ticket.id_sms_detalle;
    this.spinner.show();
    let dataPn = {
      'purchaseNumber': "" + id_sms_detalle,
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
            //this.numTransaccion = dataVisaTrans.transactionId;
            //this.numTarjeta = dataVisaTrans.card;
            this.errorMessage = dataVisaTrans.errorMessage;
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
        let dataUpdate = {
          "id_sms_detalle": this.data_ticket.id_sms_detalle,
          "idEstado": 21,
          "vip":'2'
        };
        this.boletoService.updateEstadoSMS(dataUpdate).subscribe();
      }
    );
  }

}
