import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDoItem } from '../to-do-list/to-do-list.model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
  public toDoItem: ToDoItem = {};
  public message: string = "";
  public textToBold: string = "";
  public hasImage: boolean = false;
  public imageSrc: string = "";
  public buttonText: string = "";

  constructor(public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.toDoItem = this.data.toDoItem;
    this.message = this.data.message;
    this.textToBold = this.data.textToBold;
    this.hasImage = this.data.hasImage;
    this.imageSrc = this.data.imageSrc;
    this.buttonText = this.data.buttonText;
  }

  ngOnInit(){
    
  }

  close(){
    this.dialogRef.close(this.toDoItem);
  }

  cancel(){
    this.dialogRef.close();
  }
}
