import { Injectable } from '@angular/core';
import { NewUser } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly API = 'http://localhost:3000/api/user';

    constructor(private http: HttpClient) {}

    public register(user: NewUser): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(this.API + '/register', user).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('Erreur client ou réseau : ' + error.error);
        } else {
            console.error('Erreur serveur : ' + error.error);
        }

        return throwError(() => 'Une erreur est survenue.');
    }
}
