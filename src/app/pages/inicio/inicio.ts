import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class Inicio {

  hora: string = '';
  fecha: string = '';

  constructor() {
    this.actualizarTiempo();

    // Actualiza la hora cada segundo
    setInterval(() => {
      this.actualizarTiempo();
    }, 1000);
  }

  actualizarTiempo() {
    const ahora = new Date();

    // Formato de hora
    this.hora = ahora.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Formato de fecha
    this.fecha = ahora.toLocaleDateString('es-MX', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }
}
