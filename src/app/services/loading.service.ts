import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private _loading: boolean = false;

    set loading(status: boolean) {
        this._loading = status;
    }

    get loading() {
        return this._loading;
    }
    constructor() {}
}
