import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Task } from '../model/task';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environments/environment.development';
import { map } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getTasks() {
    return this.httpClient.get(this.baseUrl + 'Task').pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  registerTask(task: Task) {
    return this.httpClient.post(this.baseUrl + 'Task', task).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateTask(id: Number, task: Task) {
    return this.httpClient.put(this.baseUrl + 'Task' + `/${id}`, task).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteTask(id: Number | undefined) {
    return this.httpClient.delete(this.baseUrl + 'Task' + `/${id}`).pipe(map((response: any) => {
      return response;
    }));
  }

  getUsers() {
    return this.httpClient.get(this.baseUrl + 'User').pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  registerUser(user: User) {
    return this.httpClient.post(this.baseUrl + 'User', user).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUser(id: Number, user: User) {
    return this.httpClient.put(this.baseUrl + 'User' + `/${id}`, user).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteUser(id: Number | undefined) {
    return this.httpClient.delete(this.baseUrl + 'User' + `/${id}`).pipe(map((response: any) => {
      return response;
    }));
  }
}
