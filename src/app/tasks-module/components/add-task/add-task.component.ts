import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TaskModel } from '../../models/task-details.model';


export function fromToday(control: AbstractControl): ValidationErrors | null {
  const valueTime = new Date(control.value).setUTCHours(0, 0, 0, 0);
  const todayTime = new Date().setUTCHours(0, 0, 0, 0);
  if (control.value && todayTime > valueTime) {
    return { 'fromToday': true }
  }
  return null
}


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnChanges {
  @Input() isUpdateForm: boolean | undefined;
  @Input() taskDetails: TaskModel | undefined;
  @Output() add = new EventEmitter();
  @Output() update = new EventEmitter();
  taskForm: FormGroup = this.fb.group({
    index: [],
    taskName: ['', Validators.required],
    description: [''],
    dueDate: [formatDate(new Date().setUTCHours(0, 0, 0, 0), 'yyyy-MM-dd', 'en-US'), [Validators.required, fromToday]],
    piority: [1, Validators.required]
  });
  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.taskDetails) {
      this.taskForm.patchValue(this.taskDetails);
    }
  }

  ngOnInit(): void {
  }
  
  onAddNew() {
    if (this.taskForm.valid) {
      this.add.emit(this.taskForm.value);
    } else {
      for (const i in this.taskForm.controls) {
        if (this.taskForm.controls.hasOwnProperty(i)) {
          this.taskForm.controls[i].markAsDirty();
          this.taskForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }
  onUpdate() {
    if (this.taskForm.valid) {
      this.update.emit(this.taskForm.value);
    } else {
      for (const i in this.taskForm.controls) {
        if (this.taskForm.controls.hasOwnProperty(i)) {
          this.taskForm.controls[i].markAsDirty();
          this.taskForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }
}
function moment(arg0: number): any {
  throw new Error('Function not implemented.');
}

