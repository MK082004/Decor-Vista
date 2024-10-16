import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public data: any[];

  public hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44307/api/userHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
    });
  };

  public askServer() {
    this.hubConnection
      .invoke('askServer', 'hey')
      .catch((err) => (throwError) => err.error.message);
  }

  public askkServerResponse() {
    this.hubConnection.on("askServerResponse", (res) => {
      console.log('SignalR response', res);
    });
  }
}
