import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Domaine } from '../entities/Domaine.Entity';
import { Specialite } from '../entities/Specialite.Entity'; 
import { CrudService } from '../Service/crud.service';
import { Categorie } from '../entities/Categorie.Entity';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-domaine-specialite',
  templateUrl: './list-domaine-specialite.component.html',
  styleUrls: ['./list-domaine-specialite.component.css']
})
export class ListDomaineSpecialiteComponent implements OnInit { 

  role: String;
  listDomaine: Domaine[]=[];
  listSpecialite: Specialite[]=[];
  listCategorie: Categorie[]=[];
  domaine:any;
  specialite : any ;
  searchQueryDomaine: string = '';
  searchQuerySpecialite: string = '';
  searchQueryCategorie: string = '';
  activeForm: string | null = null;
  constructor(private service: CrudService, private router: Router,private toast: NgToastService) { }


  showForm(form: string) {
    this.activeForm = form;
    localStorage.setItem("type", this.activeForm);
}
  
  DeleteDomaine(domaine: Domaine) {
    if (confirm("Voulez-vous supprimer ce domaine avec l'ID " + domaine.id + " ?")) {
      this.service.onDeleteDomaine(domaine.id).subscribe( res => {
        
        this.toast.success({
          detail: 'Success Message',
          summary: 'expertise supprimé avec succès',
        });
        window.location.reload();
      
      },() => {
        this.ngOnInit(); 
        
      });
    }
  }

  DeleteCategorie(categorie: Categorie) {
    if (confirm("Voulez-vous supprimer ce categorie avec l'ID " + categorie.id + " ?")) {
      this.service.onDeleteCategorie(categorie.id).subscribe(res => {
        
        this.toast.success({
          detail: 'Success Message',
          summary: 'categorie supprimé avec succès',
        });
        window.location.reload();
      
      },
        () => {
        this.ngOnInit(); 
      });
    }
  }

 
  DeleteSpecialite(specialite: Specialite) {
    if (confirm("Voulez-vous supprimer cette spécialité avec l'ID " + specialite.id + " ?")) {
      this.service.onDeleteSpecialite(specialite.id).subscribe(res => {
        
        this.toast.success({
          detail: 'Success Message',
          summary: 'Specialité supprimé avec succès',
        });
        window.location.reload();
      
      },
        () => {

        this.ngOnInit(); 
      });
    }
  }

  ngOnInit(): void { 
    this.role = localStorage.getItem("role") as string;
    this.service.getDomaines().subscribe(domaine => {
      this.listDomaine = domaine;
    });
    this.service.getSpecialites().subscribe(specialite => {
      this.listSpecialite = specialite;
    });
    this.service.getCategories().subscribe(categorie => {
      this.listCategorie = categorie;
    });
  }

  get filteredDomaine(): Domaine[] {
    if (!this.searchQueryDomaine) {
      return this.listDomaine;
    }
    return this.listDomaine.filter(domaine =>
      domaine.nomDomaine.toLowerCase().includes(this.searchQueryDomaine.toLowerCase())
    );
  }
  get filteredSpecilaite(): Specialite[] {
    if (!this.searchQuerySpecialite) {
      return this.listSpecialite;
    }
    return this.listSpecialite.filter(Specialite =>
      Specialite.nomSpecialite.toLowerCase().includes(this.searchQuerySpecialite.toLowerCase())
    );
  }
  get filteredCategorie(): Categorie[] {
    if (!this.searchQueryCategorie) {
      return this.listCategorie;
    }
    return this.listCategorie.filter(Categorie =>
      Categorie.nomCategorie.toLowerCase().includes(this.searchQueryCategorie.toLowerCase())
    );
  }

  

  p:number=1;
  collection:any[]

}

