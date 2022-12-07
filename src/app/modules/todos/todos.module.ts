import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from 'src/app/components/todo-item/todo-item.component';
import { TodoListComponent } from 'src/app/components/todo-list/todo-list.component';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';
import { SearchFormComponent } from 'src/app/components/search-form/search-form.component';
import { TodosComponent } from 'src/app/pages/todos/todos.component';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from 'src/app/components/spiner/spiner.component';

@NgModule({
    declarations: [
        TodoItemComponent,
        TodoListComponent,
        AddFormComponent,
        SearchFormComponent,
        TodosComponent,
        SpinerComponent
    ],
    imports: [CommonModule, FormsModule],
    exports: [TodosComponent]
})
export class TodosModule {}
