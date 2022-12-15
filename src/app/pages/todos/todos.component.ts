import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    debounceTime,
    delay,
    filter,
    find,
    from,
    map,
    Observable,
    of,
    pipe,
    retry,
    Subject,
    tap,
} from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TodoService } from 'src/app/services/todo.service';

interface IMeetup {
    id: number;
    name: string;
}

interface ILuke {
    name: string;
    birthYear: string;
    height: number;
    weight: number;
    eyeColor: string;
}

interface IPerson {
    id: number;
    name: string;
    username: string;
}

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

        // if (this.authService.token)
        //     this.http
        //         .get<any[]>(this.baseURL)
        //         .pipe(
        //             map((item: IMeetup) => ({id: item.id, name: item.name }))
        //             // tap(console.log)
        //             // map((response: any[]) =>
        //             //     response.map((item: IMeetup) => ({
        //             //         id: item.id,
        //             //         name: item.name,
        //             //     }))
        //             // ),

        //         )
        //         .subscribe(console.log);

        // this.authService.getUsers().subscribe(console.log)

        // from([30, 41, 60])
        //     .pipe(
        //         filter((num) => num % 10 === 0),
        //         map((num) => num * 2),
        //         find(num => num > 60)
        //     )
        //     .subscribe((vl) => console.log(vl));

        this.http
            .get('https://swapi.dev/api/people/1')
            .pipe(
                map((response: any)  => ({
                    surname: response.name,
                    birthYear: response.birth_year,
                    height: Number(response.height),
                    weight: Number(response.mass),
                    eyeColor: response.eye_color,
                }))
            )
            .subscribe((luke) => console.log(luke));
    }

    private changeFormat(meetups: any[]): IMeetup[] {
        return meetups.map((meetup) => ({
            id: meetup.id,
            name: meetup.name,
        }));
    }
    private filterMeetups(meetups: IMeetup[]): IMeetup[] {
        return meetups.filter((item) => item.name !== 'Test');
    }
    meetups: any[] = [];

    baseURL: string = `${environment.apiUrl}/meetup`;
}
