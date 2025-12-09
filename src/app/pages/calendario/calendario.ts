import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Nota: Se ha eliminado la importación de EventosService

// Interfaz que define la estructura de un día en el calendario
interface Dia {
  numero: number;
  fecha: string; // Formato YYYY-MM-DD
  reservado: boolean; // Se mantiene, pero siempre será false sin servicio
  listaReservaciones: any[]; // Se mantiene, pero siempre estará vacía
  seleccionado: boolean;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.scss']
})
export class Calendario implements OnInit {

  mesActual: number = new Date().getMonth();
  anio: number = new Date().getFullYear();
  nombreMes: string = '';
  diasDelMes: Dia[] = [];
  diasVaciosInicio: any[] = [];
  diaSeleccionado: Dia | null = null;

  meses: string[] = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  // ❌ Constructor sin inyección de servicios
  constructor() {}

  ngOnInit(): void {
    this.generarCalendario();
    // ❌ Se ha eliminado la llamada a this.cargarEventos();
  }

  /**
   * Genera la cuadrícula de días para el mes y año actuales.
   * Contiene toda la lógica de cálculo de fechas.
   */
  generarCalendario() {
    this.nombreMes = this.meses[this.mesActual];
    this.diasDelMes = [];
    this.diasVaciosInicio = [];

    // Calcular el día de la semana del primer día del mes (0=Dom, 1=Lun...)
    const primerDia = new Date(this.anio, this.mesActual, 1).getDay();
    // Calcular el número total de días en el mes
    const totalDias = new Date(this.anio, this.mesActual + 1, 0).getDate();

    // Rellenar días vacíos al inicio de la cuadrícula
    for (let i = 0; i < primerDia; i++) {
      this.diasVaciosInicio.push(i);
    }

    // Crear los objetos Día para el mes
    for (let dia = 1; dia <= totalDias; dia++) {
      // Formato YYYY-MM-DD
      const fecha = `${this.anio}-${(this.mesActual + 1).toString().padStart(2,'0')}-${dia.toString().padStart(2,'0')}`;
      this.diasDelMes.push({
        numero: dia,
        fecha,
        reservado: false, // Por defecto es false
        listaReservaciones: [], // Por defecto es vacío
        seleccionado: false
      });
    }

    // Al generar un nuevo calendario, si había un día seleccionado, limpiarlo
    this.diaSeleccionado = null;
  }

  // ❌ Método eliminado: cargarEventos()

  /**
   * Maneja la selección de un día en la cuadrícula.
   */
  seleccionarDia(dia: Dia) {
    // Deseleccionar el día anterior
    this.diasDelMes.forEach(d => d.seleccionado = false);

    // Seleccionar el nuevo día
    dia.seleccionado = true;
    this.diaSeleccionado = dia;
  }

  /**
   * Verifica si el día del calendario coincide con la fecha de hoy.
   */
  esHoy(dia: Dia): boolean {
    const hoy = new Date();
    return dia.numero === hoy.getDate() &&
           this.mesActual === hoy.getMonth() &&
           this.anio === hoy.getFullYear();
  }

  /**
   * Cambia al mes anterior y regenera el calendario.
   */
  mesAnterior() {
    if (this.mesActual === 0) { // Si es Enero, cambia a Diciembre del año anterior
      this.mesActual = 11;
      this.anio--;
    } else {
      this.mesActual--;
    }
    this.generarCalendario();
    // ❌ Se ha eliminado la llamada a this.cargarEventos();
  }

  /**
   * Cambia al mes siguiente y regenera el calendario.
   */
  mesSiguiente() {
    if (this.mesActual === 11) { // Si es Diciembre, cambia a Enero del año siguiente
      this.mesActual = 0;
      this.anio++;
    } else {
      this.mesActual++;
    }
    this.generarCalendario();
    // ❌ Se ha eliminado la llamada a this.cargarEventos();
  }
}
