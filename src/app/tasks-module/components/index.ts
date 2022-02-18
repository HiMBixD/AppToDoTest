import { from } from "rxjs";
import { AddTaskComponent } from "./add-task/add-task.component";
import { ListTasksComponent } from "./list-tasks/list-tasks.component";

export const components: any[] = [
    AddTaskComponent,
    ListTasksComponent
];

export * from "./add-task/add-task.component";
export * from "./list-tasks/list-tasks.component";