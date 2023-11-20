import { Component } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { ToDoItem } from './to-do-list.model';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Priority, Status } from './to-do-list.enum';
import { MatDialog } from '@angular/material/dialog';
import { ToDoListDetailComponent } from './to-do-list-detail/to-do-list-detail.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent {
  public toDoList: ToDoItem[] = [];
  public priorityEnum = Priority;
  public statusEnum = Status;
  public isEdit: boolean = true;

  constructor(private toDoListService: ToDoListService,
    public dialog: MatDialog) {}

  ngOnInit(){
    this.toDoListService.getAll().subscribe((toDoList: ToDoItem[]) => {
      this.toDoList = toDoList;
    })
  }

  addItem(){
    this.openDetail();
  }

  editItem(itemId: string){
    console.log(itemId);
  }

  removeItem(itemId: string){
    console.log(itemId);
  }

  openDetail(){
    const dialogRef = this.dialog.open(ToDoListDetailComponent, {
      height: 'auto',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(item => {
      const req : ToDoItem = {
        title: item.title,
        itemList: [],
        priority: item.priority,
        dueDate: item.dueDate,
        status: Status.Active,
        createdBy: "System",
        createdDate: new Date(),
        lastUpdatedBy: "System",
        lastUpdatedDate: new Date()
      }

      this.toDoListService.add(req).subscribe((x:ToDoItem[]) =>{
        if(x.length > 0){
          //display latest list
          this.toDoList = x; 
        }
      })
    })
  }
}
