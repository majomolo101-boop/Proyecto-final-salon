import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Proveedor {
  id?: number;
  nombre: string;
  apellido?: string | null;
  empresa: string;
  email?: string | null;
  telefono: string;
  telefono_personal?: string | null;
  expanded?: boolean;
}

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './proveedores.html',
  styleUrls: ['./proveedores.scss']
})
export class Proveedores implements OnInit {

  loading = false;
  message = '';
  searchTerm = '';

  proveedores: Proveedor[] = [];
  nuevoProveedor: Proveedor = this.getProveedorInicial();
  proveedorEditando: Proveedor | null = null;
  showFormProveedor = false;

  private url = 'http://localhost:3000/proveedores'; // URL de tu API

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProveedores();
  }

  // ====================== MÉTODOS ======================

  // Cargar todos los proveedores
  loadProveedores() {
    this.loading = true;
    this.http.get<Proveedor[]>(this.url).subscribe({
      next: (res) => {
        this.proveedores = res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar proveedores:', err);
        this.loading = false;
      }
    });
  }

  crearProveedor() {
    if (!this.nuevoProveedor.nombre.trim() || !this.nuevoProveedor.empresa?.trim() || !this.nuevoProveedor.telefono?.trim()) {
      this.showMessage('Nombre, Empresa y Teléfono son requeridos', true);
      return;
    }

    if (this.proveedorEditando && this.proveedorEditando.id) {
      // Actualizar proveedor existente con PATCH
      this.http.patch(`${this.url}/${this.proveedorEditando.id}`, this.nuevoProveedor).subscribe({
        next: () => {
          this.showMessage('✓ Proveedor actualizado');
          this.cancelCrearProveedor();
          this.loadProveedores();
        },
        error: (err) => console.error('Error al actualizar proveedor:', err)
      });
    } else {
      // Crear proveedor nuevo
      this.http.post(this.url, this.nuevoProveedor).subscribe({
        next: () => {
          this.showMessage('✓ Proveedor creado');
          this.cancelCrearProveedor();
          this.loadProveedores();
        },
        error: (err) => console.error('Error al crear proveedor:', err)
      });
    }
  }

  cancelCrearProveedor() {
    this.showFormProveedor = false;
    this.proveedorEditando = null;
    this.nuevoProveedor = this.getProveedorInicial();
  }

  editarProveedor(proveedor: Proveedor) {
    this.proveedorEditando = proveedor;
    this.nuevoProveedor = { ...proveedor };
    this.showFormProveedor = true;
  }

 eliminarProveedor(id?: number) {
  if (!id) return;
  if (!confirm('¿Seguro que quieres eliminar este proveedor?')) return;

  this.http.delete(`${this.url}/${id}`).subscribe({
    next: () => this.loadProveedores(),
    error: (err) => console.error('Error al eliminar:', err)
  });
}


  toggleProveedor(proveedor: Proveedor) {
    proveedor.expanded = !proveedor.expanded;
  }

  get filteredProveedores(): Proveedor[] {
    if (!this.searchTerm.trim()) return this.proveedores;
    const term = this.searchTerm.toLowerCase();
    return this.proveedores.filter(p =>
      (p.nombre ?? '').toLowerCase().includes(term) ||
      (p.apellido ?? '').toLowerCase().includes(term) ||
      (p.empresa ?? '').toLowerCase().includes(term) ||
      (p.email ?? '').toLowerCase().includes(term) ||
      (p.telefono ?? '').includes(term)
    );
  }

  showMessage(msg: string, isError: boolean = false) {
    this.message = msg;
    setTimeout(() => this.message = '', 4000);
  }

  private getProveedorInicial(): Proveedor {
    return {
      id: 0,
      nombre: '',
      apellido: null,
      empresa: '',
      email: null,
      telefono: '',
      telefono_personal: null,
      expanded: false
    };
  }
}
