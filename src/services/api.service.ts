import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Task } from '../model/task';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment.development';
import { map } from 'rxjs';
import { User } from '../model/user';

var token = '';
var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = environment.apiUrl;

  userId: string = '';

  constructor(private httpClient: HttpClient) { }
  
  makeHeaderToken() {
    token = localStorage.getItem("jwt")!;
    console.log('jwt header token ' + token);
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer " + token, "Content-Type": "application/json"}) };
  }

  login(User: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + 'Auth/' + 'Login', User).pipe(
      map((response: any) => {
        this.userId = response.userId;
        return response;
      })
    );
  }

  getTasksForDate(id: string, date: string) {
    return this.httpClient.get(this.baseUrl + 'Task/' + `${id},` + `${date}`).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  getTasks() {
    return this.httpClient.get(this.baseUrl + 'Task').pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  getTask(id: number) {
    return this.httpClient.get(this.baseUrl + 'Task/' + `${id}`).pipe(
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

  updateTask(id: number | undefined, task: Task) {
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

  getUser(id: string) {
    return this.httpClient.get(this.baseUrl + 'User/' + `${id}`).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  registerUser(user: User) {
    return this.httpClient.post(this.baseUrl + 'Auth/' + 'register', user).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUser(id: string, user: User): Observable<User> {
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
