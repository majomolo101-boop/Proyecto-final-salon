import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // ← Asegúrate que solo tenga estos dos
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Si ya está autenticado, redirigir a inicio
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/inicio']);
    }
  }

  loginUser() {
    // Limpiar mensaje de error previo
    this.errorMessage = '';

    // Validar campos vacíos
    if (!this.username.trim()) {
      this.errorMessage = 'Por favor, ingresa tu usuario';
      this.shakeForm();
      return;
    }

    if (!this.password.trim()) {
      this.errorMessage = 'Por favor, ingresa tu contraseña';
      this.shakeForm();
      return;
    }

    // Mostrar loading
    this.isLoading = true;

    // Simular delay de red (puedes quitarlo si no lo necesitas)
    setTimeout(() => {
      // Intentar login
      const loginSuccess = this.authService.login(this.username, this.password);

      if (loginSuccess) {
        console.log('Login exitoso');
        // Redirigir a inicio
        this.router.navigate(['/inicio']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.password = ''; // Limpiar contraseña por seguridad
        this.shakeForm();
      }

      this.isLoading = false;
    }, 800);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar Enter en el formulario
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.loginUser();
    }
  }

  // Animación de shake para errores
  private shakeForm() {
    const form = document.querySelector('.login-form');
    if (form) {
      form.classList.add('shake');
      setTimeout(() => {
        form.classList.remove('shake');
      }, 500);
    }
  }
}
