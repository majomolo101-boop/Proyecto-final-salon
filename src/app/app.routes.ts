import { Routes} from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { Calendario } from './pages/calendario/calendario';
import { Clientes } from './pages/clientes/clientes';
import { Banqueteros } from './pages/banqueteros/banqueteros';
import { Proveedores } from './pages/proveedores/proveedores';
import { Logout } from './pages/logout/logout';
import { Reservas } from './pages/reservas/reservas';


export const routes: Routes = [
  { path: 'login', component: Login },         // pantalla principal
  { path: 'inicio', component: Inicio },      //inicio
  { path: 'calendario', component: Calendario},
  { path: 'clientes', component: Clientes},
  { path: 'banqueteros', component: Banqueteros},
  { path: 'proveedores', component: Proveedores},
  { path: 'logout', component: Logout},
  { path: 'reservas', component: Reservas},
  { path: '**', redirectTo: 'login' }           // redirige cualquier otra ruta al login
];

