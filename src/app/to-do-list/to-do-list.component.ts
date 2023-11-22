import { Component } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { ToDoItem } from './to-do-list.model';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Priority, Status } from './to-do-list.enum';
import { MatDialog } from '@angular/material/dialog';
import { ToDoListDetailComponent } from './to-do-list-detail/to-do-list-detail.component';
import { MessageBoxComponent } from '../message-box/message-box.component';

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
    this.isEdit = false;
    this.openDetail();
  }

  editItem(item: ToDoItem){
    this.isEdit = true;
    this.openDetail(item);
  }

  updateStatus(item: ToDoItem){
    item.status = Status.Completed;
    this.openConfirmationBox(item);
  }

  removeItem(item: ToDoItem){
    this.toDoListService.delete(item).subscribe((x:ToDoItem[]) =>{
      //display latest list
      this.toDoList = x; 
    });
  }

  updateToDoListItem(req: ToDoItem){
    this.toDoListService.update(req).subscribe((x:ToDoItem[]) =>{
      if(x.length > 0){
        //display latest list
        this.toDoList = x; 
      }
    });
  }

  addToDoListItem(req: ToDoItem){
    this.toDoListService.add(req).subscribe((x:ToDoItem[]) =>{
      if(x.length > 0){
        //display latest list
        this.toDoList = x; 
      }
    });
  }

  openDetail(item?: ToDoItem){
    const dialogRef = this.dialog.open(ToDoListDetailComponent, {
      height: 'auto',
      width: '600px',
      disableClose: true,
      data:{
       isEdit: this.isEdit,
       toDoItem: item
      }
    });

    dialogRef.afterClosed().subscribe(detailItem => {
      if(detailItem){
        const req : ToDoItem = {
          title: detailItem.title,
          itemList: [],
          priority: detailItem.priority,
          dueDate: detailItem.dueDate,
          status: (detailItem.status === Status.Active) ? Status.Completed: Status.Active,
          createdBy: "System",
          createdDate: new Date(),
          lastUpdatedBy: "System",
          lastUpdatedDate: new Date()
        }
  
        if(!this.isEdit){
          this.addToDoListItem(req);
        }
        else{
          req.id = detailItem.id;
          this.updateToDoListItem(req);
        }
      }
    });
  }

  openConfirmationBox(item: ToDoItem){
    const dialogRef = this.dialog.open(MessageBoxComponent, {
      height: 'auto',
      width: '400px',
      disableClose: true,
      data:{
        toDoItem: item,
        message: `Congratulations on completing`,
        textToBold: item.title,
        hasImage: true,
        imageSrc: '/assets/images/pepe-thumbs-up.gif',
        buttonText: 'Thanks Pepe'
      }
    });

    dialogRef.afterClosed().subscribe(item =>{
      this.updateToDoListItem(item);
    });
  }

}
