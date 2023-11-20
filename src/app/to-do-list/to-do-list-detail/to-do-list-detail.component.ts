import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-to-do-list-detail',
  templateUrl: './to-do-list-detail.component.html',
  styleUrls: ['./to-do-list-detail.component.css']
})
export class ToDoListDetailComponent {
  selectedPriority: number = 0;
  priorityList = [
    { id: 1, name: 'Low Priority' },
    { id: 2, name: 'Medium Priority' },
    { id: 3, name: 'High Priority' },
  ];
  public form: FormGroup = new FormGroup({
    title: new FormControl(),
    itemList: new FormControl(),
    priority: new FormControl(),
    dueDate: new FormControl(),
    status: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<ToDoListDetailComponent>) {

  }

  ngOnInit(){

  }

  getFormControl(controlName: string): FormControl{
    return this.form.get(controlName) as any;
  }

  closeDialog(){
    this.dialogRef.close(this.form.getRawValue());
  }
}
