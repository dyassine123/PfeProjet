import { Component } from '@angular/core';
import { Cours } from '../entities/Cours.Entity';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Tuteur } from '../entities/Tuteur.Entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  listCours: Cours[]=[];
  role:String;
  token: string | null = null;
  listTuteur: Tuteur[]=[];

  constructor(private service:CrudService,private router:Router ) {
    
    this.token = localStorage.getItem('myToken'); 
  }

  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getCours().subscribe(cours => {
      this.listCours = cours.slice(0, 4) ;
    });
    this.service.getTuteur().subscribe((tuteurs: any[]) => {
      
      this.listTuteur = tuteurs.filter(tuteur => tuteur.etat === true);
    });
  }

}
