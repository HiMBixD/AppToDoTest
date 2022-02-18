import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksModuleRoutingModule } from './tasks-module-routing.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    TasksModuleRoutingModule
  ]
})
export class TasksModuleModule { }
