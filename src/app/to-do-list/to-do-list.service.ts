import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { GetToDoItem, ToDoItem } from './to-do-list.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private baseUrl = 'https://localhost:44333/Maintenance'; // Replace with API endpoint

  constructor(private http: HttpClient) {}

  getAll(request: GetToDoItem) {
    return this.http.post<any>(`${this.baseUrl}/GetAll`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(catchError((err: HttpErrorResponse) =>{
      console.error(err);
      throw err;
    }));
  }

  getById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/GetById?id=${id}`).pipe(
      catchError((err: HttpErrorResponse) =>{
        console.error(err);
        throw err;
      }));
  }

  add(request: ToDoItem) {
    return this.http.post<any>(`${this.baseUrl}/Add`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(catchError((err: HttpErrorResponse) =>{
      console.error(err);
      throw err;
    }));
  }

  update(request: ToDoItem) {
    return this.http.post<any>(`${this.baseUrl}/Update`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(catchError((err: HttpErrorResponse) =>{
      console.error(err);
      throw err;
    }));
  }

  delete(request: ToDoItem) {
    return this.http.post<any>(`${this.baseUrl}/Delete`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(catchError((err: HttpErrorResponse) =>{
      console.error(err);
      throw err;
    }));
  }
}