import { Component } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent {

  token: string | null = null;

  constructor() {
    
    this.token = localStorage.getItem('myToken') 
    
  }

}
