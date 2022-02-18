import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel } from '../../models/task-details.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  @Input() listTasks: TaskModel[] | undefined;
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();
  listShowed: any = new Set();
  listChecked: any = new Set();
  searchValue: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onRemove(items: any[]) {
    this.remove.emit(items);
  }

  onUpdate(itemToUpdate: TaskModel) {
    this.update.emit(itemToUpdate);
  }

  get setAsCheckedArray(): any[] {
    return [...this.listChecked];
  }
  get listTasksSortedByDate(): TaskModel[] | undefined {
    const listTasks = _.cloneDeep(this.listTasks);
    listTasks?.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return listTasks?.filter(value => value.taskName.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
}
