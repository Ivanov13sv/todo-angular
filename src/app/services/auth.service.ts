import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl: string = `${environment.apiUrl}/auth`;

    public get token(): string | null {
        return localStorage.getItem('del_meetups_auth_token');
    }

    constructor(
        public http: HttpClient,
        private router: Router,
        private errorService: ErrorService,
        private loadingService: LoadingService
    ) {}

    parseJwt(token: string) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return (
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    }

    public get user(): any | null {
        const token = localStorage.getItem('del_meetups_auth_token');
        if (token) {
            const user: any = this.parseJwt(token);
            return user;
        } else return null;
    }

    private errorHandler() {
        this.errorService.handle('incorrect email or password');
        this.loadingService.loading = false;
        return throwError(() => 'incorrect email or password');
    }

    login(email: string, password: string): Observable<{ token: string }> {
        return this.http
            .post<{ token: string }>(`${this.baseUrl}/login`, {
                email,
                password,
            })
            .pipe(
                delay(500),
                retry(1),
                tap((res) => {
                    if (res.token) {
                        localStorage.setItem(
                            'del_meetups_auth_token',
                            res.token
                        );
                        this.router.navigate(['todos']);
                        this.errorService.clean();
                    }
                }),
                catchError(this.errorHandler.bind(this))
            );
    }

    logout() {
        localStorage.removeItem('del_meetups_auth_token');
        this.router.navigate(['']);
    }
}
