import { Component } from '@angular/core';
import { Cours } from '../entities/Cours.Entity';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Categorie } from '../entities/Categorie.Entity';
import { Tuteur } from '../entities/Tuteur.Entity';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  token: string | null = null;
  
  listCours: Cours[]=[];
  listCategorie: Categorie[]=[];
  listTuteur: Tuteur[]=[];
  searchQuery: string = '';
  role:String;
  activeCategory: string = '';
  activeTuteurId: number | null = null;

  constructor(private service:CrudService,private router:Router ) {
    
    this.token = localStorage.getItem('myToken'); 
  }

  setActiveCategory(categoryName: string): void {
    this.activeCategory = categoryName;
  }
  setActiveTuteur(tuteurId: number | null): void {
    this.activeTuteurId = tuteurId;
  }

  get filteredCours(): Cours[] {
    let filtered = this.listCours;
  
    if (this.activeCategory) {
      filtered = filtered.filter(cours => cours.categorie.nomCategorie === this.activeCategory);
    }
  
    if (this.activeTuteurId !== null) {
      filtered = filtered.filter(cours => cours.tuteur.id === this.activeTuteurId);
    }
  
    if (this.searchQuery) {
      filtered = filtered.filter(cours =>
        cours.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        cours.tuteur.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        cours.categorie.nomCategorie.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
    return filtered;
  }
  

  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getCours().subscribe(cours => {
      this.listCours = cours
    });
    this.service.getCategories().subscribe(categorie => {
      this.listCategorie = categorie;
    });
    this.service.getTuteur().subscribe((tuteurs: any[]) => {
      
      this.listTuteur = tuteurs.filter(tuteur => tuteur.etat === true);
    });
  }

}
