import { Component } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { GetToDoItem, ToDoItem } from './to-do-list.model';
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
  public isRemove: boolean = false;
  public recordPerPage = [10,20,30,50];
  public form: FormGroup = new FormGroup({
    recordPerPage: new FormControl(this.recordPerPage[0]),
    searchText: new FormControl('')
  });
  public pageIndex: number = 0;
  constructor(private toDoListService: ToDoListService,
    public dialog: MatDialog) {}

  ngOnInit(){
    this.getAllItem();
    this.getFormControl("recordPerPage").valueChanges.subscribe(records => {
      this.getAllItem();
    });

    this.getFormControl("searchText").valueChanges.subscribe(records => {
      this.getAllItem();
    });
  }

  getAllItem(){
    const req = this.getToDoItemReq();
    this.toDoListService.getAll(req).subscribe((toDoList: ToDoItem[]) => {
      this.toDoList = toDoList;
    });
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
    this.isRemove = false;
    item.status = Status.Completed;
    this.openConfirmationBox(item);
  }

  removeItem(item: ToDoItem){
    this.isRemove = true;
    this.openConfirmationBox(item); 
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

  removeToDoListItem(req: ToDoItem){
    this.toDoListService.delete(req).subscribe((x:ToDoItem[]) =>{
      //display latest list
      this.toDoList = x; 
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
          status: (detailItem.status === Status.Completed) ? Status.Active: detailItem.status,
          createdBy: "System",
          createdDate: new Date(),
          lastUpdatedBy: "System",
          lastUpdatedDate: new Date(),
          getToDoItem: this.getToDoItemReq()
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
    item.getToDoItem = this.getToDoItemReq();
    const dialogRef = this.dialog.open(MessageBoxComponent, {
      height: 'auto',
      width: '400px',
      disableClose: true,
      data:{
        toDoItem: item,
        message: (!this.isRemove) ? "Congratulations on completing" : "Are you sure to remove ",
        textToBold: item.title,
        hasImage:  !this.isRemove,
        imageSrc:  (!this.isRemove) ? "/assets/images/pepe-thumbs-up.gif" : "",
        buttonText:  (!this.isRemove) ? "Thanks Pepe": "Confirm"
      }
    });

    dialogRef.afterClosed().subscribe(item =>{
      if(item){
        (!this.isRemove) ? this.updateToDoListItem(item) :  this.removeToDoListItem(item);
      }
    });
  }

  getFormControl(controlName: string): FormControl{
    return this.form.get(controlName) as any;
  }

  getToDoItemReq(): GetToDoItem{
    return {
      pageIndex: this.pageIndex,
      recordPerPage: this.getFormControl('recordPerPage').value,
      searchText: this.getFormControl('searchText').value
    }
  }

}
