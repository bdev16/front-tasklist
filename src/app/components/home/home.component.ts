import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule, MatNativeDateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentDate: Date = new Date();
  visibleOptions: boolean = false;
  visibleLinksNavbarMobile: boolean = false;

  viewMobileOptions() {
    this.visibleOptions = !this.visibleOptions;
  }

  viewNavbarMobileOptions() {
    this.visibleLinksNavbarMobile = !this.visibleLinksNavbarMobile;
  }

  ngAfterViewInit() {
    
  }

}
