import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() public removeTodo = new EventEmitter();
  @Output() public toggleStatus = new EventEmitter<{ id: number, status: Todo['status'] }>();

  allStatuses: Array<Todo['status']> = [
    'completed', 'important', 'incompleted'
  ]

  activeStatus !: Todo['status']

  ngOnInit() {
    this.activeStatus = this.todo.status
  }

  onChangeStatus() {
    this.toggleStatus.emit({ id: this.todo.id, status: this.activeStatus })
  }

}
