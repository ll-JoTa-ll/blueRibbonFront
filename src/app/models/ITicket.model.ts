import { ITicketPasajeroModel } from './ITicketPasajero.model';

export interface ITicketModel {
  status: number;
  message: string;
  ticket: ITicketPasajeroModel;
}
