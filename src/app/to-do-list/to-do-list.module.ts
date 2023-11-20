import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoListService } from './to-do-list.service';
import { ToDoListComponent } from './to-do-list.component';
import { ToDoListRoutingModule } from './to-do-list-routing.module';


@NgModule({
  declarations: [ToDoListComponent],
  imports: [
    CommonModule, 
    FormsModule,
    ToDoListRoutingModule
  ], 
  providers:[
    ToDoListService
  ]// Use 'forChild' when importing routes in a feature module
})
export class ToDoListModule {}