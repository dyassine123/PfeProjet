import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  token: string | null = null;

  constructor() {
    
    this.token = localStorage.getItem('myToken'); 
  }

}
