import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Tuteur } from '../entities/Tuteur.Entity';

@Component({
  selector: 'app-list-tuteur',
  templateUrl: './list-tuteur.component.html',
  styleUrls: ['./list-tuteur.component.css']
})
export class ListTuteurComponent {

  role:String
  listTuteur: Tuteur[]=[];
  searchQuery: string = '';
   tuteur: any;
 
  constructor(private service:CrudService,private router:Router ) { }




  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getTuteur().subscribe(tuteur => {
      this.listTuteur = tuteur
    })
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

  p:number=1;
  collection:any[]

  updateensetat(ense:Tuteur){
    console.log(ense);
  
    let index=this.listTuteur.indexOf(ense);
    if(ense.etat==true)
    {let newTuteur=new Tuteur(ense.id,ense.nom,ense.prenom,ense.email,ense.password,false)
  this.service.updateTuteur(newTuteur,ense.id).subscribe
  (
    res=>{console.log(res)
    this.listTuteur[index]=newTuteur
    },
    err=>console.log(err)
  )
    }
   
    else{
  
      let newTuteur=new Tuteur(ense.id,ense.nom,ense.prenom,ense.email,ense.password,true)
      this.service.updateTuteur(newTuteur,ense.id).subscribe
    (
      res=>{console.log(res)
      this.listTuteur[index]=newTuteur
      },
      err=>console.log(err)
    )
  
    }
  
  
  
  }

}
