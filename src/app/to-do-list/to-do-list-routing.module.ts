import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list.component';

const routes: Routes = [
  { path: '', component: ToDoListComponent },
  // Add any other routes specific to the RsvpModule here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoListRoutingModule {}