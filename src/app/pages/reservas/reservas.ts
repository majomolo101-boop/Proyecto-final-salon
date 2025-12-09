import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.html',
  styleUrls: ['./reservas.scss']
})
export class Reservas implements OnInit {

  // ⚠️ Los arrays se mantienen vacíos, sin datos de prueba (MOCK)
  reservations: any[] = [];

  // 📝 Objeto para el formulario (usando nomenclatura snake_case para coincidir con la API futura)
  nuevoEvento: any = {
    // Campos esperados por la API (el ID del cliente vendrá del HTML/input)
    id_cliente: null,
    fecha_evento: '',
    hora_entrada: '',
    hora_salida: '',
    tipo_evento: '',
    paquete: '',
    numero_personas: null,
    tiempo_extra: 0,
    servicios_extra: [''], // Inicializado con un campo vacío para la UI
  };

  // El constructor no recibe ninguna inyección de servicio
  constructor() {}

  ngOnInit() {
    // Si no hay servicios, estas funciones solo preparan la vista
    this.cargarEventos();
    // Nota: La carga de clientes (si fuera necesaria) ya no está aquí.
  }

  // =======================================================
  // LÓGICA DE EVENTOS (PLACEHOLDERS)
  // =======================================================

  // Función placeholder para simular la creación de la reserva
  crearReserva() {
    // 📝 VALIDACIÓN MÍNIMA
    if (!this.nuevoEvento.id_cliente || !this.nuevoEvento.fecha_evento || !this.nuevoEvento.hora_entrada) {
      return alert('Faltan campos obligatorios para crear la reserva.');
    }

    // Aquí se enviaría el 'payload' a un servicio POST
    console.log('--- EVENTO LISTO PARA ENVIAR (SIMULACIÓN) ---');
    console.log('Payload:', this.nuevoEvento);

    // 💡 Lógica de éxito:
    alert('Reserva creada exitosamente (SIMULACIÓN).');

    // 💡 Resetear el formulario a su estado inicial
    this.nuevoEvento = {
        id_cliente: null,
        fecha_evento: '',
        hora_entrada: '',
        hora_salida: '',
        tipo_evento: '',
        paquete: '',
        numero_personas: null,
        tiempo_extra: 0,
        servicios_extra: [''],
    };

    this.cargarEventos(); // Llama al placeholder para recargar la lista (vacía)
  }

  // Función placeholder para simular la carga de eventos
  cargarEventos() {
    // Aquí se llamaría al servicio GET de la API
    console.log('Cargando eventos... (Llamada al servicio GET omitida)');

    // 💡 Ejemplo de cómo se usaría la propiedad 'mes' si se cargaran datos:
    // this.reservations = datosDeLaAPI.map((ev: any) => ({
    //    ...ev,
    //    mes: new Date(ev.fecha_evento).toLocaleString('es-MX', { month: 'long' }),
    // }));
  }

  // =======================================================
  // LÓGICA DE LA INTERFAZ DE USUARIO (UI)
  // =======================================================

  // Métodos para el manejo del array dinámico de servicios extra en el formulario
  addServicioExtra() {
    if (!this.nuevoEvento.servicios_extra) {
      this.nuevoEvento.servicios_extra = [];
    }
    this.nuevoEvento.servicios_extra.push('');
  }

  removeServicioExtra(index: number) {
    if (this.nuevoEvento.servicios_extra.length > 1) {
        this.nuevoEvento.servicios_extra.splice(index, 1);
    }
  }

  // Propiedad para contar eventos pendientes
  get pendingCount(): number {
    return this.reservations.length;
  }

  // Propiedad para agrupar reservas por mes (funciona con el array 'reservations', aunque esté vacío)
  get groupedByMonth(): { [mes: string]: any[] } {
    return this.reservations.reduce((acc: any, reservation) => {
      // Esta lógica asume que cada objeto de 'reservation' ya tiene una propiedad 'mes'
      if (!acc[reservation.mes]) acc[reservation.mes] = [];
      acc[reservation.mes].push(reservation);
      return acc;
    }, {});
  }

  // Propiedad auxiliar para iterar sobre un objeto en Angular (ngFor)
  get objectEntries() { return Object.entries; }
}
