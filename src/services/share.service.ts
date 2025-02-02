import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/task';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private valueSource = new BehaviorSubject<Number>(0);
  public value = this.valueSource.asObservable();
  private instanceTask = new BehaviorSubject<Task | null>(null); 
  public valueTask = this.instanceTask.asObservable();
  private instanceUser = new BehaviorSubject<User | null>(null); 
  public valueUser = this.instanceUser.asObservable();
  private valueAtributeDisabled = new BehaviorSubject<Boolean>(false);
  public valueAtribute = this.valueAtributeDisabled.asObservable();
  private valueTitleComponent = new BehaviorSubject<String>("Titulo");
  public valueTitle = this.valueTitleComponent.asObservable();

  constructor() { }

  changeValue(value: Number) {
    this.valueSource.next(value);
  }

  modifieTask(task: Task) {
    this.instanceTask.next(task);
  }

  modifieUser(user: User) {
    this.instanceUser.next(user);
  }

  toggleDisabled(value: Boolean) {
    this.valueAtributeDisabled.next(value);
  }

  modifiedTitleComponent(value: String) {
    this.valueTitleComponent.next(value);
  }
}
