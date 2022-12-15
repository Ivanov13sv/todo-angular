import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { fromEvent, map, Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {
    input$ = new Observable(observer => {
      observer.next(1)
      observer.next(2)
    });

    // get value(){
    //   return this.input$
    // }

    ngOnChanges(changes: SimpleChanges): void {
        // fromEvent(input$, 'keyup')
        //     .pipe(
        //         map((event) => {
        //             return event.target.value;
        //         }),
        //         filter((val) => {
        //             return val.length >= 3;
        //         }),
        //         debounceTime(1000),
        //         distinctUntilChanged()
        //     )
        //     .subscribe((val) => {
        //         console.log('Запрос к бэкенду:', val);
        //     });
    }
}
