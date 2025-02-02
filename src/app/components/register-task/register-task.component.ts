import { AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../model/task';
import { FormsModule } from '@angular/forms';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-register-task',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register-task.component.html',
  styleUrl: './register-task.component.css'
})
export class RegisterTaskComponent implements AfterViewInit{

  isDisabled = false;

  titleComponent = "";

  registerOrUpdate!: Number;
  task: Task = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    status: 1,
    userId: 1
  };

  // id!: number;
  // title!: string;
  // description!: string;
  // status = 1;
  // date!: Date;
  // idUser!: Number;
  id = 0;
  title = "";
  description = "";
  status = 1;
  date = new Date;
  idUser = 1;

  constructor(
    private shareService: ShareService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef 
  )
  {}

  ngAfterViewInit(): void {
    this.shareService.value.subscribe(
      value => this.registerOrUpdate = value
    );
    this.shareService.valueTask.subscribe(task => {
      if (task != null) {
        this.task = task;
        this.fillFilds(this.task);
        this.cdr.detectChanges();
      } else {
        console.log(task);
      }
    });
    this.shareService.valueAtribute.subscribe(
      value => this.isDisabled = Boolean(value)
    );
    this.shareService.valueTitle.subscribe(
      value => this.titleComponent = String(value)
    );
    this.cdr.detectChanges(); 
    // this.id = Number(this.task.id);
    console.log(this.id);
  }

  // ngOnInit(): void {
  //   this.shareService.value.subscribe(
  //     value => this.registerOrUpdate = value
  //   );
  //   this.shareService.valueTask.subscribe(
  //     task => task = this.task
  //   );
  //   this.fillFilds(this.task);
  // }

  createTask() {
    console.log(new Task(this.title, this.description, this.date, this.status, this.idUser));
    this.apiService.registerTask({title: this.title, description: this.description, date: this.date, status: this.status, userId: this.idUser}).subscribe((response: any) => {
      console.log(response);
    });;
    // this.apiService.registerTask(new Task(this.title, this.description, this.date, this.status, this.idUser)).subscribe((response: any) => {
    //   console.log(response);
    // });;
  }

  updateTask() {
    this.apiService.updateTask( this.id, { id: this.id, title: this.title, description: this.description, date: this.date, status: this.status, userId: this.idUser }).subscribe((response: any) => {
      console.log(response);
    })
  }

  fillFilds(task: Task) {
    this.id = Number(task.id);
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.date = task.date;
    this.idUser = Number(task.userId);
  }

  modifiedTitleComponent(value: String) {
    this.titleComponent = String(value);
  }
  
}
