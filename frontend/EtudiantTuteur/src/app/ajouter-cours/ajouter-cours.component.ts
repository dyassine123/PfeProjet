import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Categorie } from '../entities/Categorie.Entity';
import { SaveCours } from '../entities/SaveCour.Entity';

@Component({
  selector: 'app-ajouter-cours',
  templateUrl: './ajouter-cours.component.html',
  styleUrls: ['./ajouter-cours.component.css']
})
export class AjouterCoursComponent {
  token: string | null = null;
  messageCommande=""
  AjouterForm:FormGroup
  userFile:any
  message=""
  imagePath:any
  imgURL:any
  listcategorie:Categorie[]
  constructor(private services : CrudService , private router : Router,private fb:FormBuilder) {

    this.token = localStorage.getItem('myToken'); 
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
        description: new FormControl('',[
          Validators.required,]),
    
      prix: new FormControl('',[
        Validators.required,]),
      image: new FormControl('',[
        Validators.required,]),
            categorie: new FormControl('',[
              Validators.required,]),
             
        }
     this.AjouterForm = this.fb.group(formControls)
   }
   onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
   get nom() {return this.AjouterForm.get('nom');} 
   get description() {return this.AjouterForm.get('description');} 
  get prix() { return this.AjouterForm.get('prix');}
  get image() {return this.AjouterForm.get('image');}
  get categorie() {return this.AjouterForm.get('categorie');} 
  
  
  
   addNewCour() {
    let datas=this.services.getUserInfo()
    let data = this.AjouterForm.value;
    console.log(data);
    let model:SaveCours=new SaveCours();
    model.id=null;
    model.nom=data.nom;
    model.description=data.description;
    model.prix=data.prix;
    model.image=this.imgURL;
    model.idCategorie=+data.categorie;
    model.idTuteur=datas?.id;
    if (
      data.nom == 0 ||
      data.description == 0 ||
      data.prix == 0||
      data.image== 0||
      data.categorie==0
    ) {
      this.messageCommande=`<div class="alert alert-danger" role="alert">
      remplir votre champ 
    </div>`
    } else {
    this.services.addCour(model).subscribe(
      res=>{
        console.log(res);
        this.messageCommande=`<div class="alert alert-success" role="alert">
        Message envoyer avec succe
      </div>`
        
        this.router.navigate(['/cours'])
        ;
      },
       err=>{
        this.messageCommande=`<div class="alert alert-warning" role="alert">
        service en panne!!!! 
      </div>`
  
      })
      setTimeout(() => {
        this.messageCommande=""
      }, 3000);
    
    }
  }


  ngOnInit(): void {
    this.services.getcategorie().subscribe(categorie=>{this.listcategorie=categorie})
  }


}




