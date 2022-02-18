import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task-details.model';
import * as _ from 'lodash';
@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  listTasks: TaskModel[] = [];
  constructor() { }

  ngOnInit(): void {
    if (!localStorage.getItem('tasksToDo')) {
      localStorage.setItem('tasksToDo', JSON.stringify([
        {
          index: 1,
          taskName: 'Do Homework',
          description: 'boring??',
          dueDate: '2022-06-24',
          piority: 0
        },
        {
          index: 2,
          taskName: 'Do more Homework',
          description: 'even more boring??',
          dueDate: '2022-06-23',
          piority: 0
        },
        {
          index: 3,
          taskName: 'Play Game',
          description: 'feel cool?',
          dueDate: '2022-06-29',
          piority: 0
        }
      ]));
    } else {
      this.listTasks = JSON.parse(localStorage.getItem('tasksToDo') || '[]');
    }
  }

  onRemove(list: any[]) {
    this.listTasks = this.listTasks.filter(value =>
      !list.includes(value.index)
    );
    localStorage.setItem('tasksToDo', JSON.stringify(this.listTasks));
  }

  onAddNew(item: TaskModel) {
    const itemToAdd = _.cloneDeep(item);
    itemToAdd.index = (Math.max.apply(Math, this.listTasks.map(function (o) { return o.index; })) | 0) + 1;
    this.listTasks.push(itemToAdd);
    localStorage.setItem('tasksToDo', JSON.stringify(this.listTasks));
  }
  onUpdate(item: TaskModel) {
    this.onRemove([item.index]);
    this.listTasks.push(item);
    localStorage.setItem('tasksToDo', JSON.stringify(this.listTasks));
  }
}
