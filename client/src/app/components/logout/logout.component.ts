import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router){};

    ngOnInit(): void {
        this.authService.logout().subscribe({
            next: (response) => this.router.navigate(['/connexion']),
            error: (error) => this.router.navigate(['/connexion']),
        });
    }
}
