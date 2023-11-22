import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoListService } from './to-do-list.service';
import { ToDoListComponent } from './to-do-list.component';
import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { MatDialogModule} from "@angular/material/dialog";
import { ToDoListDetailComponent } from './to-do-list-detail/to-do-list-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageBoxComponent } from '../message-box/message-box.component';

@NgModule({
  declarations: [ToDoListComponent,ToDoListDetailComponent,MessageBoxComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ToDoListRoutingModule,
    MatDialogModule,
    FormsModule,
    NgSelectModule
  ], 
  providers:[
    ToDoListService
  ]// Use 'forChild' when importing routes in a feature module
})
export class ToDoListModule {}