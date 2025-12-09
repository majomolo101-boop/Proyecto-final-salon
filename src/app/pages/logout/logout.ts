import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,  // ← IMPORTANTE
  imports: [CommonModule],
  template: `
    <div class="logout-container">
      <div class="logout-card">
        <i class="fas fa-sign-out-alt logout-icon"></i>
        <h2>Cerrando sesión...</h2>
        <div class="spinner"></div>
      </div>
    </div>
  `,
  styleUrls: ['./logout.scss']
})
export class Logout implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}
