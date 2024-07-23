import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: MainComponent, canActivate: [authGuard] },
    { path: 'inscription', component: RegisterComponent },
    { path: 'connexion', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
