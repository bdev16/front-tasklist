import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Task } from '../../../model/task';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  dataSource!: Task[];
  isLoadingResults = true;

  constructor(
    private shareService: ShareService,
    private apiService: ApiService
  ) { }
  
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.apiService.getTasks().subscribe((response: any) => {
      console.log(response);
      this.dataSource = response;
      console.log(this.dataSource);
    });
  }

  defineRegisterOrUpdateValue(value: number) {
    this.shareService.changeValue(value);
  }

  recoverTaskInstance(task: Task) {
    this.shareService.modifieTask(task);
  }

  toggleDisabled(value: Boolean) {
    this.shareService.toggleDisabled(value);
  }

  modifiedTitleComponent(value: String) {
    this.shareService.modifiedTitleComponent(value);
  }

  updateTask(task: Task, ancore: Number) {
    if (ancore == 1) {
      this.apiService.updateTask(Number(task.id), { id: Number(task.id), title: task.title, description: task.description, date: task.date, status: 1, userId: task.userId }).subscribe(response => {
        console.log(response);
        this.getTasks();
      })
    } else if (ancore == 2) {
      this.apiService.updateTask(Number(task.id), { id: Number(task.id), title: task.title, description: task.description, date: task.date, status: 2, userId: task.userId }).subscribe(response => {
        console.log(response);
        this.getTasks();
      })
    }
  }

  deleteTask(id: Number | undefined) {
    console.log(id);
    this.apiService.deleteTask(id).subscribe(response => {
      console.log(response);
      this.getTasks();
    });
  }

  // getTasks() {
  //   this.api.getTasks()
  //     .subscribe(res => this.dataSource = res);
  // }

  // ngOnInit(): void {
  //   this.api.getTasks()
  //     .subscribe(res => {
  //       this.dataSource = res;
  //       console.log(this.dataSource);
  //       this.isLoadingResults = false;
  //     }, err => {
  //       console.log(err);
  //       this.isLoadingResults = false;
  //   })
  // }

}
