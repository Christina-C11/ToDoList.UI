import { Component } from '@angular/core';
import { ToDoListService } from './to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {
  constructor(private toDoListService: ToDoListService) {}

  ngOnInit(){
    console.log("test")
    this.toDoListService.getAll().subscribe(x => {
      console.log(x);
    })
  }
}
