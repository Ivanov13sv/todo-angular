import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {

  value: string = '';

  @Output() public getValue = new EventEmitter();

  addTodo() {
    this.getValue.emit(this.value)
    this.value = ''
  }
}
