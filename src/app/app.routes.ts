import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login';
import { ForgotPasswordComponent } from './pages/forgot-password';
import { LoadingComponent } from './pages/loading';
import { NotFoundComponent } from './pages/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
