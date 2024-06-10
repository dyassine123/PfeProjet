import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { NgToastService } from 'ng-angular-popup';
import { DomSanitizer } from '@angular/platform-browser';
import { Cours } from '../entities/Cours.Entity';
import { Tuteur } from '../entities/Tuteur.Entity';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-profil-tuteur',
  templateUrl: './profil-tuteur.component.html',
  styleUrls: ['./profil-tuteur.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, display: 'block' })),
      state('out', style({ opacity: 0, display: 'none' })),
      transition('in => out', [
        animate('0.5s ease-in-out')
      ]),
      transition('out => in', [
        animate('0.5s ease-in-out')
      ])
    ])
    
  ]
})
export class ProfilTuteurComponent implements OnInit {
  userDetails: any;
  idTuteur: number;
  listCours: Cours[];
  updateForm1: FormGroup;
  updateForm: FormGroup;
  messageCommande = "";
  userFile: any;
  message = "";
  imagePath: any;
  imgURL: any;
  id: number;
  currentTuteur = new Tuteur();
  totalCourses: number;

  oldPasswordForm: FormGroup;
  oldPasswordConfirmed: boolean = false;

  isLoading: boolean = false;
  tuteur: any = {};

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute,
    private toast: NgToastService,
    private sanitizer: DomSanitizer
  ) {
    this.userDetails = this.service.userDetails();
    let formControles = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"), 
        Validators.minLength(4),
      ]),
     
      prenom: new FormControl('', [Validators.required]),

    
      email: new FormControl('', [Validators.required]),
      
      image: new FormControl('',[
        Validators.required,]),
            
             
        
     
      
    };

    let formControles1 = {
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    };

    this.oldPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required]
    });
    

    
    this.updateForm1 = this.fb.group(formControles1);
   
    this.updateForm = this.fb.group(formControles);
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get prenom() {
    return this.updateForm.get('prenom');
  }
  get email() {
    return this.updateForm.get('email');
  }

  get password() { return this.updateForm1.get('password'); }
  get confirmPassword() { return this.updateForm1.get('confirmPassword'); }

  get image() {return this.updateForm.get('image');}


  ngOnInit(): void {
    this.userDetails = this.service.userDetails();
    this.idTuteur = this.userDetails.id;
    this.service.getCours().subscribe((cours: Cours[]) => {
      this.listCours = cours.filter(cours => cours.tuteur.id === this.idTuteur);
      this.totalCourses = this.listCours.length;
    });

    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findTuteurById(idEvent).subscribe((result) => {
      this.tuteur = result ;
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.prenom,
        email: event.email,
        image: event.image,
      });
      this.updateForm1.patchValue({
      });
    });
  }



  updateTuteur() {
    let data = this.updateForm.value;
  
    
    if (!data.nom || !data.prenom || !data.email) {
      this.toast.info({
        detail: 'Erreur de validation',
        summary: 'Veuillez remplir tous les champs requis!',
      });
      return;
    }
  
    let model: Tuteur = new Tuteur();
    model.id = null; 
    model.nom = data.nom;
    model.prenom = data.prenom;
    model.email = data.email;
    model.image = this.imgURL;
  
    console.log(model);  
    console.log(data);  
  
    this.service.updateTuteur(this.id, model).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
        window.location.reload();
       
      },
      error => {
        console.error('Error updating tuteur:', error);
        this.toast.error({
          detail: 'Erreur réseau',
          summary: 'Erreur lors de la mise à jour des informations. Veuillez réessayer plus tard.',
        });
      }
    );
  }
  


updatePasswordTuteur(): void {
  
  if (this.updateForm1.get('password').hasError('required') || this.updateForm1.get('confirmPassword').hasError('required')) {
    this.toast.info({
      detail: 'Erreur de validation',
      summary: 'Veuillez remplir tous les champs requis!',
    });
    return;
  }

  
  if (!this.passwordsMatch()) {
    this.toast.error({
      detail: 'Message d\'erreur',
      summary: 'Les mots de passe ne correspondent pas!',
    });
    return; 
  }

  let data = this.updateForm1.value;
  let tuteur = new Tuteur(); 
  tuteur.id = this.id;
  tuteur.password = data.password; 
  
  this.service.updatePasswordTuteur(this.id, tuteur).subscribe(
    res => {
      console.log(res);
      this.route.navigate(['']).then(() => {
        window.location.reload();
      });
    },
    error => {
      console.error('Error updating password:', error);
    }
  );
}


checkOldPasswordTuteur(): void {

  this.isLoading = true;
 
  setTimeout(() => {
    this.isLoading = false;
    
    const oldPassword = this.oldPasswordForm.value.oldPassword;
  this.service.checkOldPasswordTuteur(this.userDetails.id, oldPassword).subscribe(
    isValid => {
      if (isValid) {
        this.oldPasswordConfirmed = true; 
      } else {
      
      this.toast.error({
        detail: 'Error Message',
        summary: 'Mot de passe incorrect !',
      });
    }
  });
}, 3000);
}




passwordsMatch(): boolean {
  const password = this.updateForm1.get('password').value;
  const confirmPassword = this.updateForm1.get('confirmPassword').value;
  return password === confirmPassword;
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


DeleteCours(cours: Cours) {
  if (confirm("Voulez-vous supprimer cette spécialité avec l'ID " + cours.id + " ?")) {
    this.service.onDeleteCours(cours.id).subscribe({
      next: () => {
        this.toast.success({
          detail: 'Succès',
          summary: 'Cours supprimé avec succès!',
        });
        this.ngOnInit();   
      },
      error: (error) => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'le cours à réserver ne peut pas être effacé',
        });
      }
    });
  }
}



}

