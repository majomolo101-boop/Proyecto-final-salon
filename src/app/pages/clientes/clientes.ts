import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss']
})
export class Clientes implements OnInit {

  clients: any[] = [];
  filteredClients: any[] = [];

  expandedId: number | null = null;
  showForm = false;
  searchTerm: string = '';
  message: string = '';
  error: boolean = false;

  formData: any = this.resetForm();
  editingId: number | null = null; // ID del cliente/evento

  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarClientes();
  }

  // Cargar todos los clientes
  cargarClientes() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.clients = data;
      this.filteredClients = [...this.clients];
    });
  }

  // Reiniciar formulario
  resetForm() {
    return {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      tipo_evento: '',
      fechaEvento: '',    // YYYY-MM-DD
      fechaEntrada: '',   // HH:MM
      fechaSalida: '',    // HH:MM
      numeroPersonas: 0
    };
  }

  // Mostrar mensaje temporal
  showMessage(msg: string, isError: boolean = false) {
    this.message = msg;
    this.error = isError;
    setTimeout(() => (this.message = ''), 3000);
  }

  // Guardar o actualizar cliente
  handleSave() {
    if (!this.formData.nombre || !this.formData.telefono) {
      this.showMessage('Nombre y teléfono son obligatorios', true);
      return;
    }

    // Angular clientes.ts
const payload = {
  nombre: this.formData.nombre,
  apellido: this.formData.apellido,
  telefono: this.formData.telefono,
  email: this.formData.email,
  tipo_evento: this.formData.tipo_evento,
  fechaEvento: this.formData.fechaEvento || null,
  fechaEntrada: this.formData.fechaEntrada ? this.formData.fechaEntrada + ':00' : null,
  fechaSalida: this.formData.fechaSalida ? this.formData.fechaSalida + ':00' : null,
  numeroPersonas: Number(this.formData.numeroPersonas) || 0 // <- importante
};


    if (this.editingId !== null) {
      this.http.patch(`${this.apiUrl}/${this.editingId}`, payload, { headers: { 'Content-Type': 'application/json' } })
        .subscribe(() => {
          this.showMessage('Cliente/evento actualizado');
          this.cargarClientes();
          this.handleCancel();
        }, (err) => {
          this.showMessage('Error al actualizar cliente', true);
          console.error(err);
        });
    } else {
      this.http.post(this.apiUrl, payload, { headers: { 'Content-Type': 'application/json' } })
        .subscribe(() => {
          this.showMessage('Cliente creado');
          this.cargarClientes();
          this.handleCancel();
        }, (err) => {
          this.showMessage('Error al crear cliente', true);
          console.error(err);
        });
    }
  }

  // Editar cliente
  handleEdit(client: any) {
    this.formData = {
      nombre: client.nombre,
      apellido: client.apellido,
      telefono: client.telefono,
      email: client.email,
      tipo_evento: client.tipo_evento,
      fechaEvento: client.fechaEvento ? client.fechaEvento : '',
      fechaEntrada: client.fechaEntrada ? client.fechaEntrada.slice(0,5) : '',
      fechaSalida: client.fechaSalida ? client.fechaSalida.slice(0,5) : '',
      numeroPersonas: client.numeroPersonas
    };
    this.editingId = client.id;
    this.showForm = true;
  }

  // Crear nuevo cliente
  handleCreateNew() {
    this.handleCancel();
    this.showForm = true;
  }

  // Eliminar cliente
  handleDelete(id: number) {
    if (!confirm('¿Eliminar este cliente/evento?')) return;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.showMessage('Cliente/evento eliminado');
      this.cargarClientes();
    }, (err) => {
      this.showMessage('Error al eliminar cliente', true);
      console.error(err);
    });
  }

  // Filtrar clientes
  handleSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(c =>
      c.nombre.toLowerCase().includes(term) ||
      c.apellido.toLowerCase().includes(term) ||
      (c.tipo_evento && c.tipo_evento.toLowerCase().includes(term))
    );
  }

  // Cancelar edición/crear
  handleCancel() {
    this.showForm = false;
    this.formData = this.resetForm();
    this.editingId = null;
  }

  // Expandir datos
  handleToggleExpand(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  // Convertir tiempo a AM/PM
  convertToAMPM(time: string): string {
    if (!time) return '';
    let [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
  }
}
