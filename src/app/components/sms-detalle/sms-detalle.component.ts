import {Component, OnInit, TemplateRef} from '@angular/core';
import { BoletoService } from '../../services/boleto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sms-detalle',
  templateUrl: './sms-detalle.component.html',
  styleUrls: ['./sms-detalle.component.sass']
})
export class SmsDetalleComponent implements OnInit {

  locale = 'es';
  locales = listLocales();

  listSms: any[] = [];
  listBrb: any[] = [];
  listTotal: any[] = [];
  textoSelEstado: string;
  idSelEstado: number;
  totalRegistros;
  dateCustomClasses: DatepickerDateCustomClasses[];
  bsRangeValue: Date[];

  modalRefSms: BsModalRef;

  boletoPasajero: any;

  constructor(
    private boletoService: BoletoService,
    public spinner: NgxSpinnerService,
    private localeService: BsLocaleService,
    private modalService: BsModalService
  ) {
    this.listTotal = [];
    this.textoSelEstado = "Seleccionar Estado";
  }

  ngOnInit() {
    this.localeService.use(this.locale);
    this.idSelEstado = 0;
    this.getList1();
  }

  getList1() {
    this.listTotal = [];
    this.spinner.show();
    this.boletoService.getListaActivos().subscribe(
      result => {
        if (result.status === 1) {
          this.listTotal = result.list;
          this.totalRegistros = this.listTotal.length;
        }
      },
      error => {
        console.log("buscarSmsEnviados ERROR: " + JSON.stringify(error));
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        console.log("buscarSmsEnviados COMPLETADO");
      }
    );
  }

  seleccionarEstado(estado, texto) {
    this.idSelEstado = estado;
    this.textoSelEstado = texto;
    if (estado === 0) {
      this.getList1();
    }
    if (estado === 1) {
      this.listTotal = [];
      this.spinner.show();
      this.boletoService.getListSmsSend(1).subscribe(
        result => {
          if (result.status === 1) {
            this.listSms = result.list;

            let listTotal = this.listTotal;
            this.listSms.forEach(function(item1) {
              listTotal.push(item1);
            });

            this.listTotal = listTotal;
            this.totalRegistros = this.listTotal.length;
          }
        },
        error => {
          console.log("buscarSmsEnviados ERROR: " + JSON.stringify(error));
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
    if (estado === 3) {
      this.listTotal = [];
      this.spinner.show();
      this.boletoService.getListSmsSend(3).subscribe(
        result => {
          if (result.status === 1) {
            this.listBrb = result.list;

            let listTotal = this.listTotal;
            this.listBrb.forEach(function(item1) {
              listTotal.push(item1);
            });

            this.listTotal = listTotal;
            this.totalRegistros = this.listTotal.length;
          }
        },
        error => {
          console.log("buscarSmsEnviados ERROR: " + JSON.stringify(error));
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }

  buscar() {
    let listTotal = this.listTotal;
    let flagFechas = 0;
    const bsRangeValue = this.bsRangeValue;
    if (this.bsRangeValue !== undefined) {
      flagFechas = 1;
    }
    if (flagFechas === 1) {
      listTotal.forEach(function(item) {
        if (item.fechaSalida.length >= 10) {
          const fechaIni = item.fechaSalida.substring(0, 10).split('/');
          const fechaFin = item.fechaLlegada.substring(0, 10).split('/');
          const fechaSalida = new Date(parseInt(fechaIni[2]), parseInt(fechaIni[0]), parseInt(fechaIni[1]));
          const fechaLlegada = new Date(parseInt(fechaFin[2]), parseInt(fechaFin[0]), parseInt(fechaFin[1]));

          const fechaRange1 = bsRangeValue[0];
          const fechaRange2 = bsRangeValue[1];

          console.log(fechaRange1);
          console.log(fechaRange2);
        }
      });
    }
  }

  openModalSms(template: TemplateRef<any>, item) {
    console.log("openModalSms");
    console.log(JSON.stringify(item));
    this.boletoPasajero = item;
    this.modalRefSms = this.modalService.show(template);
  }

  sendSms() {
    //console.log("openModalSms");
    //console.log(JSON.stringify(this.boletoPasajero));
    const url_sms = environment.url_sms;
    const boletoPasajero = this.boletoPasajero;
    let smsLis: any[] = [];
    let dataBoletos = {
      "nombre": boletoPasajero.nombreCliente,
      "apellido": boletoPasajero.apellidoCliente,
      "celular": boletoPasajero.celular,
      "correo": boletoPasajero.correo,
      "pais": "Peru",
      "numBoleto": boletoPasajero.numBoleto,
      "ruta": boletoPasajero.ruta,
      "nacional": boletoPasajero.nacional,
      "vip": boletoPasajero.vip,
      "docIdentidad": boletoPasajero.docIdentidad,
      "telefonoPax": boletoPasajero.telefonoPax,
      "corporativo": boletoPasajero.corporativo,
      "FechaSalida": boletoPasajero.fechaSalida,
      "FechaLlegada": boletoPasajero.fechaLlegada,
      "AirLineCode": boletoPasajero.airLineCode,
      "AirLineName": boletoPasajero.airLineName,
      "AirLineConfirmationNumber": boletoPasajero.airLineConfirmationNumber,
      "urlStr": url_sms
    };
    //console.log("openModalSms dataBoletos");
    //console.log(JSON.stringify(dataBoletos));
    smsLis.push(dataBoletos);
    let dataPost = {
      tipoSms: 'br',
      list: smsLis
    };

    //console.log("openModalSms listado");
    //console.log(JSON.stringify(dataPost));

    //return false;

    this.boletoService.sendSms(dataPost).subscribe(
      result => {
        console.log("result: " + JSON.stringify(result));
      },
      err => {
        this.spinner.hide();
        console.log("ERROR: " + JSON.stringify(err));
      },
      () => {
        this.spinner.hide();
        this.modalRefSms.hide()
        this.getList1();
      }
    );
  }

}
