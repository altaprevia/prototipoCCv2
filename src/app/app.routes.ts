import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login';
import { ForgotPasswordComponent } from './pages/forgot-password';
import { ChangePasswordComponent } from './pages/change-password';
import { LoadingComponent } from './pages/loading';
import { NotFoundComponent } from './pages/not-found';
import { DesignSystemComponent } from './pages/design-system';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'design-system', component: DesignSystemComponent },
  { path: '**', redirectTo: '/not-found' }
];
