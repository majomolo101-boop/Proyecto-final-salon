import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Banquetero {
  id?: number;
  nombre: string;
  apellido: string;
  tipo_evento: string;
  fechaEvento: string;
  fechaEntrada: string;
  fechaSalida: string;
  telefono: string;
  email: string;
  numeroPersonas: number;
}

@Component({
  selector: 'app-banqueteros',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './banqueteros.html',
  styleUrls: ['./banqueteros.scss']
})
export class Banqueteros implements OnInit {
  banqueteros: Banquetero[] = [];
  filteredBanqueteros: Banquetero[] = [];
  showForm = false;
  editingId: number | null = null;
  expandedId: number | null = null;
  searchTerm = '';
  message = '';

  formData: Banquetero = this.resetForm();
  private url = 'http://localhost:3000/banqueteros';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBanqueteros();
  }

  resetForm(): Banquetero {
    return {
      nombre: '',
      apellido: '',
      tipo_evento: '',
      fechaEvento: '',
      fechaEntrada: '',
      fechaSalida: '',
      telefono: '',
      email: '',
      numeroPersonas: 0
    };
  }

  loadBanqueteros() {
    this.http.get<Banquetero[]>(this.url).subscribe({
      next: (res) => {
        this.banqueteros = res || [];
        this.filteredBanqueteros = [...this.banqueteros];
      },
      error: (err) => console.error('Error al cargar banqueteros:', err)
    });
  }

  handleCreateNew() {
    this.showForm = true;
    this.editingId = null;
    this.formData = this.resetForm();
  }

  handleSave() {
  if (this.editingId !== null) {
    // PATCH para actualizar
    this.http.patch(`${this.url}/${this.editingId}`, this.formData).subscribe({
      next: () => {
        this.message = 'Banquetero actualizado correctamente';
        this.showForm = false;
        this.loadBanqueteros();
      },
      error: (err) => console.error('Error al actualizar:', err)
    });
  } else {
    // POST para crear nuevo
    this.http.post(this.url, this.formData).subscribe({
      next: () => {
        this.message = 'Banquetero creado';
        this.showForm = false;
        this.loadBanqueteros();
      },
      error: (err) => console.error('Error al crear:', err)
    });
  }
}

  handleEdit(b: Banquetero) {
    this.editingId = b.id || null;
    this.formData = { ...b };
    this.showForm = true;
  }

  handleDelete(id?: number) {
    if (!id) return;
    if (!confirm('¿Seguro que quieres eliminar este banquetero?')) return;

    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => this.loadBanqueteros(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  handleSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBanqueteros = this.banqueteros.filter(
      (b) =>
        b.nombre.toLowerCase().includes(term) ||
        b.apellido.toLowerCase().includes(term) ||
        b.tipo_evento.toLowerCase().includes(term)
    );
  }

  // Agregar handleCancel
handleCancel() {
  this.showForm = false;
  this.formData = this.resetForm();
  this.editingId = null;
}

// Cambiar el tipo en handleToggleExpand
handleToggleExpand(id: number | undefined) {
  if (id === undefined) return;
  this.expandedId = this.expandedId === id ? null : id;
}


  convertToAMPM(time: string): string {
    if (!time) return '';
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }
}
