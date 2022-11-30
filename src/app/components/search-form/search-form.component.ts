import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SearchFilter } from 'src/app/services/todo.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {

  @Input() searchInput!: string;
  @Input() filter!: SearchFilter;
  @Output() public filterTodo = new EventEmitter<{ filter: SearchFilter, searchInput: string }>();

  filters: SearchFilter[] = [
    'all', 'important', 'completed', 'incompleted'
  ]

  activeFilter: SearchFilter = 'all'


  onChangeFilter() {
    this.filterTodo.emit({ filter: this.activeFilter, searchInput: this.searchInput })
  }

}
