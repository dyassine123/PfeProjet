import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: string | null = null; 
  userRole: string | null = null; 
  userDetails: any | null = null;
  id: number;
  tuteur: any = {};
  etudiant: any = {};
  
  constructor(private service: CrudService, private router: Router) {
    this.userDetails = this.service.userDetails();
  }

  ngOnInit(): void {
    const storedToken = localStorage.getItem('myToken');
    if (storedToken) {
      this.token = storedToken;
    }

    const storedUserRole = localStorage.getItem('role');
    if (storedUserRole) {
      this.userRole = storedUserRole;
    }
    if(this.userRole =="tuteur"){
    this.id = this.userDetails.id;
    this.service.findTuteurById(this.id).subscribe((result) => {
      this.tuteur = result ;
    })
  }
  if(this.userRole =="etudiant"){
    this.id = this.userDetails.id;
    this.service.findClientById(this.id).subscribe((result) => {
      this.etudiant = result ;
    })
  }
  }

  logout(): void {
    localStorage.removeItem('myToken');
    this.token = null;
    location.reload(); // Reloading the page might not be necessary, consider removing this line
    this.router.navigate(['']);
    this.userDetails = null;
    this.userRole = null;
  }
}



