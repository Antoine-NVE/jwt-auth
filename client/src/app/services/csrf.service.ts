import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CsrfService {
    private readonly API = 'http://localhost:3000/api/csrf';

    constructor(private http: HttpClient) {}

    public read(): Observable<{ csrfToken: string }> {
        return this.http.get<{ csrfToken: string }>(this.API, { withCredentials: true });
    }
}
