import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../entities/Contact.Entity'; 
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-list-contact', 
  templateUrl: './list-contact.component.html', 
  styleUrls: ['./list-contact.component.css'] 
})
export class ListContactComponent { 

  role: String;
  listContact: Contact[]=[]; 
  contact: any;
  searchQuery: string = '';
  
 
  constructor(private service: CrudService, private router: Router) { }

  // Delete contact method
  DeleteContact(contact: Contact) {
    if(confirm("Voulez vous supprimer ce contact avec l'ID " + contact.id + " ?")) {
      this.service.onDeleteContact(contact.id).subscribe(() => { 
        this.router.navigate(['/listcontact']).then(() => { 
          window.location.reload();
        });
      });
    }
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;
    this.service.getContacts().subscribe(contacts => { 
      this.listContact = contacts; 
    });
  }

  get filteredContacts(): Contact[] {
    return this.searchQuery
      ? this.listContact.filter(contact =>
          contact.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) 
           )
      : this.listContact;
  }

  p:number=1;
  collection:any[]

}
