import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  apiUrl: string = "http://localhost:3000";
  getStudents(){
    return this.httpClient.get(`${this.apiUrl}/students`);
  }

  constructor(private httpClient: HttpClient) { }
}
