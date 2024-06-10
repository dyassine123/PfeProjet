import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  token: string | null = null;

  constructor(private service:CrudService,private router:Router ) {
    
    this.token = localStorage.getItem('myToken'); 
  }


}
