import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../entities/Admin.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  role: String;
  listAdmin: Admin[] = []; // Ensure this is initialized to prevent null issues
  searchQuery: string = ''; // Added for search functionality
  admin: any = {};
  userDetails: any | null = null;
  id: number;

  constructor(private service: CrudService, private router: Router) { this.userDetails = this.service.userDetails();}

  ngOnInit(): void {

    this.id = this.userDetails.id;
    this.service.findAdminById(this.id).subscribe((result) => {
      this.admin = result ;
    })
    
    this.role = localStorage.getItem("role") as string;
    this.service.getAdmin().subscribe(admins => {
      this.listAdmin = admins;
    });
  }

  get filteredAdmins(): Admin[] {
    if (!this.searchQuery) {
      return this.listAdmin;
    }
    return this.listAdmin.filter(admin =>
      admin.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      admin.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    
  }
  

  Deleteadmin(admin: Admin) {
    if (confirm("Voulez vous supprimer cet admin avec l'ID " + admin.id + " ?")) {
      this.service.onDeleteAdmin(admin.id).subscribe(() => {
        this.router.navigate(['/listadmin']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  p:number=1;
collection:any[]
}
