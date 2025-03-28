import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private valueTaskId = new BehaviorSubject<number>(0); 
  public taskId = this.valueTaskId.asObservable();

  constructor() { }
  
  changeTaskId(valueTaskId: number | undefined) {
    this.valueTaskId.next(valueTaskId!);
  }

}
