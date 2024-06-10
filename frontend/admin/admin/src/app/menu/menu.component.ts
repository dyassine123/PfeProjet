import { Component } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  role : string ;
  admin: any = {};
  userDetails: any | null = null;
  id: number;

  constructor(private service: CrudService, private router: Router) {this.userDetails = this.service.userDetails(); }


  ngOnInit(): void { 
  
    this.role=localStorage.getItem("role")as string;

    this.id = this.userDetails.id;
    this.service.findAdminById(this.id).subscribe((result) => {
      this.admin = result ;
    })

  }


}
