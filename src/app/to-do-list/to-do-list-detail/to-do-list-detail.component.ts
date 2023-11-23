import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoItem } from '../to-do-list.model';
import * as moment from 'moment';
import { Status } from '../to-do-list.enum';

@Component({
  selector: 'app-to-do-list-detail',
  templateUrl: './to-do-list-detail.component.html',
  styleUrls: ['./to-do-list-detail.component.css']
})
export class ToDoListDetailComponent {
  public selectedPriority: number = 0;
  public priorityList = [
    { id: 0, name: '--Please select--' },
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' },
  ];
  public isEdit: boolean = false;
  public toDoItem: ToDoItem = {};
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    itemList: new FormControl(),
    priority: new FormControl(this.priorityList[0].id, [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    status: new FormControl()
  });
  public title: string = "";
  public buttonText: string = "";
  constructor(public dialogRef: MatDialogRef<ToDoListDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = this.data.dialogTitle;
    this.isEdit = this.data.isEdit;
    this.title = (this.isEdit) ? "Edit" : "Add";
    this.toDoItem = this.data.toDoItem;
    this.buttonText = (this.isEdit) ? ((this.toDoItem.status === Status.Completed) ?
     "Set to Active" : "Done"): "Done";
  }

  ngOnInit(){
    if(this.isEdit && this.toDoItem){
      this.form.patchValue(this.toDoItem);
      let formatedDate = moment(this.toDoItem.dueDate).format("YYYY-MM-DD");
      this.getFormControl("dueDate").setValue(formatedDate);
    }
  }

  getFormControl(controlName: string): FormControl{
    return this.form.get(controlName) as any;
  }

  closeDialog(){
    this.validateField();
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.dialogRef.close(this.form.getRawValue());
    }
  }
  
  cancel(){
    this.dialogRef.close();
  }

  validateField(){
    let priorityFC = this.getFormControl('priority');
    (priorityFC.value == 0) ? priorityFC.setErrors({required: true}) : priorityFC.setErrors(null); 
  }

  isInvalid(formControl: FormControl){
    return (formControl.invalid && (formControl.dirty || formControl.touched));
  }
}
