import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isCollapsed = false;
  submenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router  // ← Agregar esto
  ) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.submenuOpen = false;
    }
  }

  toggleSubmenu() {
    if (!this.isCollapsed) {
      this.submenuOpen = !this.submenuOpen;
    }
  }


  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
