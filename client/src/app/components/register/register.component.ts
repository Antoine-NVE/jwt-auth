import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CsrfService } from '../../services/csrf.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    public connectedUser!: User;
    public registerForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        csrfToken: new FormControl(''),
    });

    constructor(private authService: AuthService, private csrfService: CsrfService, private router: Router) {}

    ngOnInit(): void {
        this.csrfService.read().subscribe({
            next: (response) => {
                this.registerForm.patchValue({
                    csrfToken: response.csrfToken,
                });
            },
            error: (error) => console.error(error),
        });

        this.authService.connectedUser().subscribe({
            next: (user) => (this.connectedUser = user),
            error: (error) => console.error(error),
        });
    }

    public registerFormSubmit() {
        this.authService.register(this.registerForm.value).subscribe({
            next: (response) => {
                console.log(response.message);

                this.router.navigate(['/']);
            },
            error: (error) => console.error(error),
        });
    }
}
