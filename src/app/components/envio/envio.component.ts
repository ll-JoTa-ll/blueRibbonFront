import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../../services/boleto.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.sass']
})
export class EnvioComponent implements OnInit {

  listadoBoletos: any[] = [];
  listadoBoletosSend: any[] = [];
  textoSelTipoViaje: string;
  tipoSelTipoViaje: string;
  checkboxAll: boolean;
  chekeado: boolean;
  idCheckBox: string;
  flagBuscar: boolean;

  constructor(
    private boletoService: BoletoService,
    public spinner: NgxSpinnerService
  ) {
    this.textoSelTipoViaje = "Seleccionar tipo de viaje";
    this.tipoSelTipoViaje = "";
    this.checkboxAll = true;
    this.chekeado = false;
    this.idCheckBox = "idcheck";
    this.flagBuscar = false;
  }

  ngOnInit() {
    //this.getBoletoReporte();
  }

  getBoletoReporte() {
    this.boletoService.getBoletoReporte().subscribe(
      result => {
        this.listadoBoletos = result.Data;
        console.log(this.listadoBoletos);
      },
      err => {
        console.log("ERROR: " + err);
      },
      () => {
        console.log("completado");
      }
    );
  }

  checkAll() {
    //this.chekeado = this.checkboxAll;

    let checkboxAll = this.checkboxAll;

    for (let i = 0; i < this.listadoBoletos.length; i++) {
      $("#" + this.idCheckBox + i).prop("checked", checkboxAll);
    }

    if (checkboxAll) {
      this.listadoBoletosSend = this.listadoBoletos;
    } else {
      this.listadoBoletosSend = [];
    }

    /*

    this.listadoBoletosSend = this.listadoBoletos;

    let listadoBoletosSend = this.listadoBoletosSend;
    console.log("listadoBoletosSend.length: " + listadoBoletosSend.length);
    console.log("checkboxAll: " + checkboxAll);

    listadoBoletosSend.forEach(function(boleto) {
      boleto.Chekeado = checkboxAll;
    });

    this.listadoBoletosSend = listadoBoletosSend.filter(word => word.Chekeado === true);

    */

    this.listadoBoletosSend = this.listadoBoletosSend.filter(word => word.Chekeado === true);
    console.log("listadoBoletosSend.length: " + this.listadoBoletosSend.length);

  }

  seleccionarTipoViaje(tipo, texto) {
    this.textoSelTipoViaje = texto;
    this.tipoSelTipoViaje = tipo;
  }

  onFilterChange(eve, item) {

    let idCheckBox = this.idCheckBox;
    let checkboxAll = this.checkboxAll;
    let listadoBoletosSend = this.listadoBoletosSend;
    console.log("listadoBoletosSend.length: " + listadoBoletosSend.length);

    if (checkboxAll === false) {
      this.listadoBoletos.forEach(function(boleto) {
        if (boleto.NumBoleto === item.NumBoleto) {
          if (eve.currentTarget.checked) {
            listadoBoletosSend.push(boleto);
          } else {
            boleto.Chekeado = false;
            listadoBoletosSend.push(boleto);
            listadoBoletosSend = listadoBoletosSend.filter(word => word.Chekeado === true);
          }
        }
      });
      this.listadoBoletosSend = listadoBoletosSend;
      console.log("this.listadoBoletosSend.length: " + this.listadoBoletosSend.length);
      return false;
    } else {
      console.log("MODO 2");
      this.listadoBoletos.forEach(function(boleto, index) {
        if (boleto.NumBoleto === item.NumBoleto) {
          if (eve.currentTarget.checked) {
            //boleto.Chekeado = true;
            let pos = listadoBoletosSend.indexOf(boleto);
            if (pos === -1) {
              boleto.Chekeado = true;
              listadoBoletosSend.push(boleto);
            } else {
              listadoBoletosSend[pos].Chekeado = true;
              $("#" + idCheckBox + index).prop("checked", true);
            }
          } else {
            //boleto.Chekeado = false;
            let pos = listadoBoletosSend.indexOf(boleto);
            if (pos === -1) {
              boleto.Chekeado = false;
              listadoBoletosSend.push(boleto);
              boleto.Chekeado = true;
            } else {
              listadoBoletosSend[pos].Chekeado = false;
              $("#" + idCheckBox + index).prop("checked", false);
            }
          }
          console.log("boleto.Chekeado: " + boleto.Chekeado);
          console.log("boleto: " + JSON.stringify(boleto));
        }
      });
      console.log("this.listadoBoletosSend.length: " + this.listadoBoletosSend.length);
      this.listadoBoletosSend = this.listadoBoletosSend.filter(word => word.Chekeado === true);
      console.log("this.listadoBoletosSend.length: " + this.listadoBoletosSend.length);
      return false;
    }

  }

  buscarBoletos() {
    this.spinner.show();
    this.checkboxAll = true;

    this.boletoService.getBoletoReporte().subscribe(
      result => {
        this.flagBuscar = true;
        let listadoBoletos = result.Data;

        listadoBoletos = listadoBoletos.filter(word => word.TelefonoPax.length === 9);

        if (this.tipoSelTipoViaje !== '') {
          listadoBoletos = listadoBoletos.filter(word => word.Nacional === this.tipoSelTipoViaje);
        }

        //this.listadoBoletos = listadoBoletos;

        let listadoBoletosSend: any[] = [];

        listadoBoletos.forEach(function(boleto) {
          let oBoleto = {
            NumBoleto: boleto.NumBoleto,
            Pasajero: boleto.Pasajero,
            Ruta: boleto.Ruta,
            Nacional: boleto.Nacional,
            Vip: boleto.Vip,
            DocIdentidad: boleto.DocIdentidad,
            TelefonoPax: boleto.TelefonoPax,
            Corporativo: boleto.Corporativo,
            Chekeado: true
          };
          listadoBoletosSend.push(oBoleto);
        });

        this.listadoBoletos = listadoBoletosSend.filter(word => word.Chekeado === true);
        this.listadoBoletosSend = listadoBoletosSend.filter(word => word.Chekeado === true);

        console.log(this.listadoBoletos);
      },
      err => {
        this.spinner.hide();
        console.log("ERROR: " + err);
      },
      () => {
        this.spinner.hide();
        console.log("completado");
      }
    );

  }

  sendSms() {
    this.spinner.show();
    console.log("sendSms");
    this.listadoBoletosSend = this.listadoBoletosSend.filter(word => word.Chekeado === true);
    console.log("listadoBoletosSend.length: " + this.listadoBoletosSend.length);

    let smsLis: any[] = [];

    this.listadoBoletosSend.forEach(function(boleto) {

      let dataBoletos = {
        nombre: boleto.Pasajero,
        apellido: boleto.Pasajero,
        celular: '988662201',
        correo: '',
        pais: '',
        numBoleto: boleto.NumBoleto,
        ruta: boleto.Ruta,
        nacional: boleto.Nacional,
        vip: boleto.Vip,
        docIdentidad: boleto.DocIdentidad,
        telefonoPax: '988662201',
        corporativo: boleto.PERUVIAN,
        urlStr: 'https://localhost:44316/api/values/{id}'
      };

      smsLis.push(dataBoletos);
    });

    let dataPost = {
      tipoSms: 'br',
      list: smsLis
    };

    console.log(JSON.stringify(dataPost));

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
        console.log("sendSms completado");
      }
    );
  }

  sendSms2() {

    this.spinner.show();
    console.log("sendSms2");
    this.listadoBoletosSend = this.listadoBoletosSend.filter(word => word.Chekeado === true);
    console.log("listadoBoletosSend.length: " + this.listadoBoletosSend.length);

    let boletoService = this.boletoService;
    this.listadoBoletosSend.forEach(function(boleto, index) {
      let smsLis: any[] = [];
      let dataBoletos = {
        nombre: boleto.Pasajero,
        apellido: boleto.Pasajero,
        celular: '988662201',
        correo: '',
        pais: '',
        numBoleto: boleto.NumBoleto,
        ruta: boleto.Ruta,
        nacional: boleto.Nacional,
        vip: boleto.Vip,
        docIdentidad: boleto.DocIdentidad,
        telefonoPax: '988662201',
        corporativo: boleto.PERUVIAN,
        urlStr: 'https://localhost:44316/api/values/{id}'
      };
      smsLis.push(dataBoletos);

      let dataPost = {
        tipoSms: 'br',
        list: smsLis
      };

      console.log(JSON.stringify(dataPost));

      boletoService.sendSms(dataPost).subscribe(
        result => {
          console.log("result: " + JSON.stringify(result));
        },
        err => {
          //this.spinner.hide();
          console.log("ERROR: " + JSON.stringify(err));
        },
        () => {
          //this.spinner.hide();
          console.log("sendSms completado");
        }
      );
    });
    this.spinner.hide();
  }

}
