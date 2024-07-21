import { Injectable } from '@angular/core';
import { LoginUser, User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly API = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) {}

    public register(user: LoginUser): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.API + '/register', user).pipe(catchError(this.handleError));
    }

    public login(user: LoginUser): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.API + '/login', user).pipe(catchError(this.handleError));
    }

    public logout(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.API + '/logout').pipe(catchError(this.handleError));
    }

    // En plus du message obtenu dans la plupart des requêtes, on récupère également un booléen
    public isAuth(): Observable<ApiResponse & { isAuth: boolean }> {
        return this.http.get<ApiResponse & { isAuth: boolean }>(this.API + '/is-auth').pipe(catchError(this.handleError));
    }

    public connectedUser(): Observable<User> {
        return this.http.get<User>(this.API + '/connected-user').pipe(catchError(this.handleError));
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
