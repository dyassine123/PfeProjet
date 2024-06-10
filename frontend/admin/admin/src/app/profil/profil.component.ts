import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  userDetails:any

  constructor(private router:Router,private service:CrudService) {this.userDetails = this.service.userDetails(); }


}
