import { Component, OnInit, TemplateRef } from '@angular/core';
import { BoletoService } from '../../services/boleto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';

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
    private modalService: BsModalService,
    private sessionSt: SessionStorageService
  ) {
    this.listTotal = [];
    //this.textoSelEstado = "Seleccionar Estado";
    this.textoSelEstado = "Todos";
  }

  ngOnInit() {
    this.localeService.use(this.locale);
    this.idSelEstado = 0;
    this.getList1();
  }

  getList1() {
    let litadoFiltro = [];
    const bsRangeValue = this.bsRangeValue;
    console.log("bsRangeValue: " + bsRangeValue);

    let fechaR1 = "";
    let fechaR2 = "";
    if (bsRangeValue !== undefined) {
      const fechaRange1 = bsRangeValue[0];
      const anho1 = "" + fechaRange1.getFullYear();
      let mes1 = "";
      let getMonth1 = fechaRange1.getMonth();
      getMonth1 = getMonth1 + 1;
      if (getMonth1 < 10) {
        mes1 = "0" + getMonth1;
      } else {
        mes1 = "" + getMonth1;
      }
      const getDate1 = fechaRange1.getDate();
      let dia1 = "";
      if (getDate1 < 10) {
        dia1 = "0" + getDate1;
      } else {
        dia1 = "" + getDate1;
      }
      fechaR1 = anho1 + "" + mes1 + "" + dia1;
      console.log("fechaR1: " + fechaR1);


      const fechaRange2 = bsRangeValue[1];
      const anho2 = "" + fechaRange2.getFullYear();
      let mes2 = "";
      let getMonth2 = fechaRange2.getMonth();
      getMonth2 = getMonth2 + 1;
      if (getMonth2 < 10) {
        mes2 = "0" + getMonth2;
      } else {
        mes2 = "" + getMonth2;
      }
      const getDate2 = fechaRange2.getDate();
      let dia2 = "";
      if (getDate2 < 10) {
        dia2 = "0" + getDate2;
      } else {
        dia2 = "" + getDate2;
      }
      fechaR2 = anho2 + "" + mes2 + "" + dia2;
      console.log("fechaR2: " + fechaR2);

      console.log(fechaRange1);
      console.log(fechaRange2);
    }
    this.listTotal = [];
    this.spinner.show();
    this.boletoService.getListaActivos().subscribe(
      result => {
        if (result.status === 1) {
          this.listTotal = result.list;
          if (bsRangeValue !== undefined) {
            this.listTotal.forEach(function(item) {
              if (item.idEstado === 1) {
                const fechaEnvio = item.fechaEnvio;
                console.log("fechaEnvio: " + fechaEnvio);
                console.log("fechaEnvio.length: " + fechaEnvio.length);
                const anho3 = fechaEnvio.split('-')[0];
                const mes3 = fechaEnvio.split('-')[1];
                const dia3 = fechaEnvio.split('-')[2];
                const fechaEnvioShort = anho3 + "" + mes3 + "" + dia3;
                console.log("fechaEnvioShort: " + fechaEnvioShort);
                if (parseInt(fechaR1)<=parseInt(fechaEnvioShort) && parseInt(fechaEnvioShort)<=parseInt(fechaR2)) {
                  litadoFiltro.push(item);
                }
              }

              if (item.idEstado === 3) {
                const fechaBRB = item.fechaBRB;
                console.log("fechaBRB: " + fechaBRB);
                console.log("fechaBRB.length: " + fechaBRB.length);
                const anho3 = fechaBRB.split('-')[0];
                const mes3 = fechaBRB.split('-')[1];
                const dia3 = fechaBRB.split('-')[2];
                const fechaBRBShort = anho3 + "" + mes3 + "" + dia3;
                console.log("fechaBRBShort: " + fechaBRBShort);
                if (parseInt(fechaR1)<=parseInt(fechaBRBShort) && parseInt(fechaBRBShort)<=parseInt(fechaR2)) {
                  litadoFiltro.push(item);
                }
              }
            });
            this.listTotal = litadoFiltro;
          }
          this.totalRegistros = this.listTotal.length;
          this.sessionSt.store('s_listTotal', this.listTotal);
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
    let litadoFiltro = [];
    const bsRangeValue = this.bsRangeValue;
    let fechaR1 = "";
    let fechaR2 = "";
    if (bsRangeValue !== undefined) {
      const fechaRange1 = bsRangeValue[0];
      const anho1 = "" + fechaRange1.getFullYear();
      let mes1 = "";
      let getMonth1 = fechaRange1.getMonth();
      getMonth1 = getMonth1 + 1;
      if (getMonth1 < 10) {
        mes1 = "0" + getMonth1;
      } else {
        mes1 = "" + getMonth1;
      }
      const getDate1 = fechaRange1.getDate();
      let dia1 = "";
      if (getDate1 < 10) {
        dia1 = "0" + getDate1;
      } else {
        dia1 = "" + getDate1;
      }
      fechaR1 = anho1 + "" + mes1 + "" + dia1;
      console.log("fechaR1: " + fechaR1);


      const fechaRange2 = bsRangeValue[1];
      const anho2 = "" + fechaRange2.getFullYear();
      let mes2 = "";
      let getMonth2 = fechaRange2.getMonth();
      getMonth2 = getMonth2 + 1;
      if (getMonth2 < 10) {
        mes2 = "0" + getMonth2;
      } else {
        mes2 = "" + getMonth2;
      }
      const getDate2 = fechaRange2.getDate();
      let dia2 = "";
      if (getDate2 < 10) {
        dia2 = "0" + getDate2;
      } else {
        dia2 = "" + getDate2;
      }
      fechaR2 = anho2 + "" + mes2 + "" + dia2;
      console.log("fechaR2: " + fechaR2);

      console.log(fechaRange1);
      console.log(fechaRange2);
    }
    if (estado === 0) {
      this.getList1();
    }
    if (estado === 1) {
      this.listTotal = [];
      this.spinner.show();
      this.boletoService.getListSmsSend(1).subscribe(
        result => {
          if (result.status === 1) {
            /*
            this.listSms = result.list;

            let listTotal = this.listTotal;
            this.listSms.forEach(function(item1) {
              listTotal.push(item1);
            });
            */
            this.listTotal = result.list;
            if (bsRangeValue !== undefined) {
              this.listTotal.forEach(function(item) {
                if (item.idEstado === 1) {
                  const fechaEnvio = item.fechaEnvio;
                  console.log("fechaEnvio: " + fechaEnvio);
                  console.log("fechaEnvio.length: " + fechaEnvio.length);
                  const anho3 = fechaEnvio.split('-')[0];
                  const mes3 = fechaEnvio.split('-')[1];
                  const dia3 = fechaEnvio.split('-')[2];
                  const fechaEnvioShort = anho3 + "" + mes3 + "" + dia3;
                  console.log("fechaEnvioShort: " + fechaEnvioShort);
                  if (parseInt(fechaR1)<=parseInt(fechaEnvioShort) && parseInt(fechaEnvioShort)<=parseInt(fechaR2)) {
                    litadoFiltro.push(item);
                  }
                }
              });
              this.listTotal = litadoFiltro;
            }
            this.sessionSt.store('s_listTotal', this.listTotal);
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
            /*
            this.listBrb = result.list;

            let listTotal = this.listTotal;
            this.listBrb.forEach(function(item1) {
              listTotal.push(item1);
            });
            */
            this.listTotal = result.list;
            if (bsRangeValue !== undefined) {
              this.listTotal.forEach(function(item) {
                if (item.idEstado === 3) {
                  const fechaBRB = item.fechaBRB;
                  console.log("fechaBRB: " + fechaBRB);
                  console.log("fechaBRB.length: " + fechaBRB.length);
                  const anho3 = fechaBRB.split('-')[0];
                  const mes3 = fechaBRB.split('-')[1];
                  const dia3 = fechaBRB.split('-')[2];
                  const fechaBRBShort = anho3 + "" + mes3 + "" + dia3;
                  console.log("fechaBRBShort: " + fechaBRBShort);
                  if (parseInt(fechaR1)<=parseInt(fechaBRBShort) && parseInt(fechaBRBShort)<=parseInt(fechaR2)) {
                    litadoFiltro.push(item);
                  }
                }
              });
              this.listTotal = litadoFiltro;
            }
            this.sessionSt.store('s_listTotal', this.listTotal);
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
    this.spinner.show();
    let listTotal = this.sessionSt.retrieve('s_listTotal');
    let litadoFiltro = [];
    const idSelEstado = this.idSelEstado;
    let flagFechas = 0;
    const bsRangeValue = this.bsRangeValue;
    console.log("this.bsRangeValue: " + this.bsRangeValue);
    if (this.bsRangeValue !== undefined) {
      flagFechas = 1;
    }
    if (flagFechas === 1) {
      listTotal.forEach(function(item) {
        /*
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
        */

        const fechaRange1 = bsRangeValue[0];
        const anho1 = "" + fechaRange1.getFullYear();
        let mes1 = "";
        let getMonth1 = fechaRange1.getMonth();
        getMonth1 = getMonth1 + 1;
        if (getMonth1 < 10) {
          mes1 = "0" + getMonth1;
        } else {
          mes1 = "" + getMonth1;
        }
        const getDate1 = fechaRange1.getDate();
        let dia1 = "";
        if (getDate1 < 10) {
          dia1 = "0" + getDate1;
        } else {
          dia1 = "" + getDate1;
        }
        const fechaR1 = anho1 + "" + mes1 + "" + dia1;
        console.log("fechaR1: " + fechaR1);


        const fechaRange2 = bsRangeValue[1];
        const anho2 = "" + fechaRange2.getFullYear();
        let mes2 = "";
        let getMonth2 = fechaRange2.getMonth();
        getMonth2 = getMonth2 + 1;
        if (getMonth2 < 10) {
          mes2 = "0" + getMonth2;
        } else {
          mes2 = "" + getMonth2;
        }
        const getDate2 = fechaRange2.getDate();
        let dia2 = "";
        if (getDate2 < 10) {
          dia2 = "0" + getDate2;
        } else {
          dia2 = "" + getDate2;
        }
        const fechaR2 = anho2 + "" + mes2 + "" + dia2;
        console.log("fechaR2: " + fechaR2);

        console.log(fechaRange1);
        console.log(fechaRange2);

        //Todos
        if (idSelEstado === 0) {
          if (item.idEstado === 1) {
            const fechaEnvio = item.fechaEnvio;
            console.log("fechaEnvio: " + fechaEnvio);
            console.log("fechaEnvio.length: " + fechaEnvio.length);
            const anho3 = fechaEnvio.split('-')[0];
            const mes3 = fechaEnvio.split('-')[1];
            const dia3 = fechaEnvio.split('-')[2];
            const fechaEnvioShort = anho3 + "" + mes3 + "" + dia3;
            console.log("fechaEnvioShort: " + fechaEnvioShort);
            if (parseInt(fechaR1)<=parseInt(fechaEnvioShort) && parseInt(fechaEnvioShort)<=parseInt(fechaR2)) {
              litadoFiltro.push(item);
            }
          }

          if (item.idEstado === 3) {
            const fechaBRB = item.fechaBRB;
            console.log("fechaBRB: " + fechaBRB);
            console.log("fechaBRB.length: " + fechaBRB.length);
            const anho3 = fechaBRB.split('-')[0];
            const mes3 = fechaBRB.split('-')[1];
            const dia3 = fechaBRB.split('-')[2];
            const fechaBRBShort = anho3 + "" + mes3 + "" + dia3;
            console.log("fechaBRBShort: " + fechaBRBShort);
            if (parseInt(fechaR1)<=parseInt(fechaBRBShort) && parseInt(fechaBRBShort)<=parseInt(fechaR2)) {
              litadoFiltro.push(item);
            }
          }
        }

        //1
        if (idSelEstado === 1) {
          if (item.idEstado === 1) {
            const fechaEnvio = item.fechaEnvio;
            console.log("fechaEnvio: " + fechaEnvio);
            console.log("fechaEnvio.length: " + fechaEnvio.length);
            const anho3 = fechaEnvio.split('-')[0];
            const mes3 = fechaEnvio.split('-')[1];
            const dia3 = fechaEnvio.split('-')[2];
            const fechaEnvioShort = anho3 + "" + mes3 + "" + dia3;
            console.log("fechaEnvioShort: " + fechaEnvioShort);
            if (parseInt(fechaR1)<=parseInt(fechaEnvioShort) && parseInt(fechaEnvioShort)<=parseInt(fechaR2)) {
              litadoFiltro.push(item);
            }
          }
        }

        //3
        if (idSelEstado === 3) {
          if (item.idEstado === 3) {
            const fechaBRB = item.fechaBRB;
            console.log("fechaBRB: " + fechaBRB);
            console.log("fechaBRB.length: " + fechaBRB.length);
            const anho3 = fechaBRB.split('-')[0];
            const mes3 = fechaBRB.split('-')[1];
            const dia3 = fechaBRB.split('-')[2];
            const fechaBRBShort = anho3 + "" + mes3 + "" + dia3;
            console.log("fechaBRBShort: " + fechaBRBShort);
            if (parseInt(fechaR1)<=parseInt(fechaBRBShort) && parseInt(fechaBRBShort)<=parseInt(fechaR2)) {
              litadoFiltro.push(item);
            }
          }
        }
      });
      console.log("litadoFiltro: " + JSON.stringify(litadoFiltro));
      this.listTotal = litadoFiltro;
    } else {
      //
    }
    this.spinner.hide();
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
