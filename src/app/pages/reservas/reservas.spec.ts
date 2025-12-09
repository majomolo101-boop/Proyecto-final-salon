import { Component, OnInit } from '@angular/core';

interface Reservation {
  id: number;
  name: string;
  apellido: string;
  tipo: string;
  fecha: string;
  mes: string;
}

@Component({
  selector: 'app-reservations',
  imports: [],
  templateUrl: './reservations.html',
  styleUrls: ['./reservations.scss']
})
export class Reservas implements OnInit {
  reservations: Reservation[] = [];
  groupedByMonth: { [key: string]: Reservation[] } = {};
  months: string[] = [];
  pendingCount: number = 0;

  ngOnInit(): void {
    // Aquí cargarías los datos desde tu servicio/API
    // this.loadReservations();
    this.groupReservationsByMonth();
  }

  loadReservations(): void {
    // Ejemplo de cómo cargarías desde un servicio:
    // this.reservationService.getReservations().subscribe(data => {
    //   this.reservations = data;
    //   this.groupReservationsByMonth();
    // });
  }

  groupReservationsByMonth(): void {
    this.groupedByMonth = {};
    this.months = [];

    this.reservations.forEach(reservation => {
      if (!this.groupedByMonth[reservation.mes]) {
        this.groupedByMonth[reservation.mes] = [];
        this.months.push(reservation.mes);
      }
      this.groupedByMonth[reservation.mes].push(reservation);
    });

    this.pendingCount = this.reservations.length;
  }
}
