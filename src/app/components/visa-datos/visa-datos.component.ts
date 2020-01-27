import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-visa-datos',
  templateUrl: './visa-datos.component.html',
  styleUrls: ['./visa-datos.component.sass']
})
export class VisaDatosComponent implements OnInit {

  urlJs = "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true";

  constructor() { }

  ngOnInit() {
  }

  generarBoton(sessionKey) {
    sessionKey = "5ece990120f263a313a131bde75c87dca889f9c74663b2639ecbead82f79a4dc";
    //aW50ZWdyYWNpb25lcy52aXNhbmV0QG5lY29tcGx1cy5jb206ZDVlN25rJE0=
    var merchantId = $("#merchantId").val();
    var moneda = $("#moneda").val();
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var importe = $("#importe").val();
    var email = $("#email").val();

    var json = {
      "merchantId": merchantId,
      "moneda": moneda,
      "nombre": nombre,
      "apellido": apellido,
      "importe": importe,
      "email": email
    };

    console.log("data: " + JSON.stringify(json));

    //localStorage.setItem("data", JSON.stringify(json));

    let form = document.createElement("form");
    form.setAttribute('method', "post");
    form.setAttribute('action', "https://localhost:5001/visa/AutorizarTransaccion");
    form.setAttribute('id', "boton_pago");
    //form.append('purchasenumber', '1');
    document.getElementById("btn_pago").appendChild(form);

    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', this.urlJs);
    scriptEl.setAttribute('data-sessiontoken', sessionKey);
    scriptEl.setAttribute('data-merchantid', merchantId);
    scriptEl.setAttribute('data-purchasenumber', "10");
    scriptEl.setAttribute('data-channel', 'web');
    scriptEl.setAttribute('data-amount', importe);
    scriptEl.setAttribute('data-cardholdername', "Juan");
    scriptEl.setAttribute('data-cardholderlastname', "Caro");
    scriptEl.setAttribute('data-cardholderemail', "juan.caro.1987@gmail.com");
    scriptEl.setAttribute('data-expirationminutes', '5');
    scriptEl.setAttribute('data-timeouturl', 'http://localhost:4200/visa-timeout');
    document.getElementById("boton_pago").appendChild(scriptEl);

  }

}
