import { Component } from '@angular/core';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  token: string | null = null;
  ngOnInit(): void {
    const storedToken = localStorage.getItem('myToken');
    if (storedToken) {
      this.token = storedToken;
    }

  }

}
