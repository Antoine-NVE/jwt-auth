import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CsrfService } from '../../services/csrf.service';
import { User } from '../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    public connectedUser!: User;
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        csrfToken: new FormControl(''),
    });

    constructor(private authService: AuthService, private csrfService: CsrfService) {}

    ngOnInit(): void {
        this.csrfService.read().subscribe({
            next: (response) => {
                this.loginForm.patchValue({
                    csrfToken: response.csrfToken,
                });
            },
            error: (error) => console.error(error),
        });

        this.authService.connectedUser().subscribe({
            next: (user) => (this.connectedUser = user),
        });
    }

    public loginFormSubmit() {
        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => console.log(response.message),
            error: (error) => console.log(error),
        });
    }
}
