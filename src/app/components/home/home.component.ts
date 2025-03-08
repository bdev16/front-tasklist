import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FlatpickrDirective, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
