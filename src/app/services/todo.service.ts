import { Injectable } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo'
import { filterBySearchInput } from '../shared/utils';
export type SearchFilter = Todo['status'] | 'all'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  filter: SearchFilter = 'all'
  searchField: string = ''

  private _allTodos: Todo[] = [
    { description: 'read a book', status: 'completed', id: 1 },
    { description: 'make a pie', status: 'important', id: 2 },
    { description: 'go in the park', status: 'incompleted', id: 3 },
  ]


  addTodo(description: string): void {
    if (description) {
      const newTodo: Todo = {
        description, status: 'incompleted', id: Date.now()
      }
      const updatedTodoList = [...this._allTodos, newTodo]
      this.todos = updatedTodoList

    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(item => item.id !== id);
  }

  changeStatus({ id, status }: { id: number, status: Todo['status'] }): void {
    const updatedTodos = this._allTodos.map(item => {
      if (item.id === id) return { ...item, status }
      return item;
    })
    this.todos = updatedTodos;
    console.log(status)

  }


  setFiltres({ filter, searchInput }: { filter: SearchFilter, searchInput: string }) {
    this.searchField = searchInput
    this.filter = filter
  }

  public get todos(): Todo[] {

    switch (this.filter) {
      case 'all':
        return this._allTodos.filter(item => filterBySearchInput(item, this.searchField))

      case 'important':
        return this._allTodos.filter(item => item.status === 'important' && filterBySearchInput(item, this.searchField))

      case 'completed':
        return this._allTodos.filter(item => item.status === 'completed' && filterBySearchInput(item, this.searchField));

      case 'incompleted':
        return this._allTodos.filter(item => item.status === 'incompleted' && filterBySearchInput(item, this.searchField))
    }

  }

  public set todos(todos: Todo[]) {
    this._allTodos = todos
  }



}
