import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Contact } from '../entities/Contact.Entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 listContact: Contact[]; // Renamed and typed to Contact[]
  contact: any;
  userDetails:any

  constructor(private router:Router,private service:CrudService) {this.userDetails = this.service.userDetails(); }

  ngOnInit():void{
    this.service.getContacts().subscribe(contact => {
      this.listContact = contact
      this.listContact = contact.reverse();
      this.listContact = contact.slice(0, 3);
    }) 
  }
  logout(){
    console.log("logout");
    localStorage.clear()
   
    this.router.navigate(['/login']);

    
   
    
  }

  

  

}
