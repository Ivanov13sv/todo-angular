import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    constructor(
        private authService: AuthService,
        public loadingService: LoadingService
    ) {}
    form = new FormGroup({
        login: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(8),
        ]),
    });

    get login() {
        return this.form.controls.login.value;
    }

    get password() {
        return this.form.controls.password.value;
    }

    onSubmitHandler() {
        if (this.login && this.password) {
            this.loadingService.loading = true;
            this.authService.login(this.login, this.password).subscribe(() => {
                this.loadingService.loading = false;
            });
        }
    }
}
