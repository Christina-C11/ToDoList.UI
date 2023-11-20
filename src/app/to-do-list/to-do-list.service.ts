import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private baseUrl = 'https://localhost:44333/Maintenance'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/GetAll`);
  }
}