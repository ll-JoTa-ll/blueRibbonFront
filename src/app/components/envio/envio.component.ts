import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../../services/boleto.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.sass']
})
export class EnvioComponent implements OnInit {

  listadoBoletos: any[] = [];

  constructor(
    private boletoService: BoletoService
  ) { }

  ngOnInit() {
    this.getBoletoReporte();
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

}
