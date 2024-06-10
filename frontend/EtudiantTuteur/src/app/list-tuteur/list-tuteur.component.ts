import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Tuteur } from '../entities/Tuteur.Entity';

@Component({
  selector: 'app-list-tuteur',
  templateUrl: './list-tuteur.component.html',
  styleUrls: ['./list-tuteur.component.css']
})
export class ListTuteurComponent {
  token: string | null = null;
  role:String
  listTuteur: Tuteur[]=[];
  searchQuery: string = '';
   tuteur: any;

  constructor(private service:CrudService,private router:Router )  {
    
    this.token = localStorage.getItem('myToken'); 
    
  }

  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getTuteur().subscribe((tuteurs: any[]) => {
      
      this.listTuteur = tuteurs.filter(tuteur => tuteur.etat === true);
    });
  }

  get filteredTuteur(): Tuteur[] {
    if (!this.searchQuery) {
      return this.listTuteur;
    }
    return this.listTuteur.filter(tuteur =>
      tuteur.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      tuteur.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
