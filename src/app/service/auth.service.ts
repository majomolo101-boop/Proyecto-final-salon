import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Login simple
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  }

  // Verifica si está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Logout
  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    sessionStorage.clear();
  }
}
