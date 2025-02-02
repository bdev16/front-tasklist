import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
    
  dataSource!: User[];
  isLoadingResults = true;
  
  constructor(
    private shareService: ShareService,
    private apiService: ApiService
  ) { }
    
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe((response: any) => {
      console.log(response);
      this.dataSource = response;
      console.log(this.dataSource);
    });
  }

  deleteUser(id: Number | undefined) {
    console.log(id);
    this.apiService.deleteUser(id).subscribe(response => {
      console.log(response);
      this.getUsers();
    })
  }

  recoverUserInstance(user: User) {
      this.shareService.modifieUser(user);
  }

  defineRegisterOrUpdateValue(value: number) {
    this.shareService.changeValue(value);
  }

  toggleDisabled(value: Boolean) {
    this.shareService.toggleDisabled(value);
  }

  modifiedTitleComponent(value: String) {
    this.shareService.modifiedTitleComponent(value);
  }
}
