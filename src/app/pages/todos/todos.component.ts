import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
    constructor(
        private todoService: TodoService,
        public loadingService: LoadingService,
        private authService: AuthService,
        private http: HttpClient
    ) {}

    loading: boolean = false;

    ngOnInit(): void {
        this.loadingService.loading = true;
        this.todoService.getAllTodos().subscribe((todos) => {
            this.todoService.todos = todos;
            this.loadingService.loading = false;
        });

        if (this.authService.token)
            this.http
                .get(this.baseURL)
                .subscribe((res: any) => console.log(res));
        console.log(this.meetups);
    }

    meetups: any[] = [];

    baseURL: string = `${environment.apiUrl}/meetup`;
}
