import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  constructor(private socket: Socket ) {
    this.chequearStatus();
  }

  chequearStatus() {
    this.socket.on('connect',()=>{
      this.socketStatus = true;
      // esto es para que si por ejemplo guardamos un cambio en el backend o se baja y se sube el sitio, no se pierdan los datos de la persona que esta logueada
      console.log('se conecto el socket');
    });
    this.socket.on('disconnect',()=>{
      this.socketStatus = false;
      console.log('se desconecto el socket');
    });
  }

  emit(evento:string, payload?: any , callback?: Function ) {
    this.socket.emit(evento,payload, callback);
  }

  escuchar(evento:string) {
    // retorna un  observable
    return this.socket.fromEvent(evento);
  }

}
