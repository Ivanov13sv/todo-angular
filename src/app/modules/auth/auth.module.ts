import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from 'src/app/pages/auth/auth.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [AuthComponent],
})
export class AuthModule {}
