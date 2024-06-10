import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cours } from '../entities/Cours.Entity';
import { CrudService } from '../Service/crud.service';


@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent {
  role:String
  listCours: Cours[]=[];
  searchQuery: string = '';

cours: any;
 
  constructor(private service:CrudService,private router:Router ) { }


  //supprimer
  Deletecours(cours: Cours){
    if(confirm("Voulez vous supprimer cet cours avec l'ID " + cours.id + " ?")) {
     
      this.service.onDeleteCours(cours.id).subscribe(() => {
        this.router.navigate(['/listcours']).then(() => {
          window.location.reload()
        })
      })
   
  }
}
get filteredCours(): Cours[] {
  if (!this.searchQuery) {
    return this.listCours;
  }
  return this.listCours.filter(cours =>
    cours.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    cours.tuteur.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    cours.categorie.nomCategorie.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}


  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getCours().subscribe(cours => {
      this.listCours = cours
    })
  }
  p:number=1;
  collection:any[]
}
