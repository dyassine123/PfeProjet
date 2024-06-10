import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { Client } from '../entities/Client.Entity';
import { NgToastService } from 'ng-angular-popup';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Cours } from '../entities/Cours.Entity';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
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
export class ProfilComponent implements OnInit {
  updateForm1: FormGroup;
  updateForm: FormGroup;
  oldPasswordForm: FormGroup;
  oldPasswordConfirmed: boolean = false;
  messageCommande=""
  userFile:any
  message=""
  imagePath:any
  imgURL:any
  id: number;
  userDetails: any ;
  listCoursReserver: any;
  isLoading: boolean = false;
  ClientId : number ;
  totalReservation: number;
  etudiant: any = {};
  
  currentClient = new Client()
  jwtHelper: any;
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute,
    private toast:NgToastService,
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
            categorie: new FormControl('',[
              Validators.required,]),
             
        
     
      
    };

    let formControles1 = {
      password: new FormControl('', [Validators.required]),
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
    const token = localStorage.getItem('token');

    
    
    this.service.getClientReservations(this.userDetails.id ).subscribe(cours => {
      this.listCoursReserver = cours
      this.totalReservation = this.listCoursReserver.length;
      console.log('Courses:', cours);
    })

    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findClientById(idEvent).subscribe((result) => {
      this.etudiant = result ;
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

        if (token && !this.jwtHelper.isTokenExpired(token)) {
      
          this.userDetails.event.id = this.jwtHelper.decodeToken(token);
          localStorage.setItem("myToken",token);
     
         
         
       }

        
      
      
      
      
      }
         updateClient() {
    let data = this.updateForm.value;
    let model :Client =new Client();
     model.id=null;
      model.nom=data.nom;
      model.prenom=data.prenom;
      model.email=data.email;
      model.image=this.imgURL;

      if (!data.nom || !data.prenom || !data.email || !model.image) {
        this.toast.info({
          detail: 'Erreur de validation',
          summary: 'Veuillez remplir tous les champs requis!',
        });
        return;
      }

    console.log(model);
    console.log(data);
    this.service.updateClient(this.id, model).subscribe(
      res=>{
        this.ngOnInit();
        window.location.reload();
    
}); }
updatePassword(): void {

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
  let client = new Client(); 
  client.id = this.id;
  client.password = data.password; 
  
  this.service.updatePassword(this.id, client).subscribe(
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


checkOldPassword(): void {
  
  this.isLoading = true;

  const oldPassword = this.oldPasswordForm.value.oldPassword;
  
 
  setTimeout(() => {
    this.service.checkOldPassword(this.userDetails.id, oldPassword).subscribe(
      isValid => {
       
        this.isLoading = false;

        if (isValid) {
          this.oldPasswordConfirmed = true;
        } else {
          // Show error toast
          this.toast.error({
            detail: 'Error Message',
            summary: 'Mot de passe incorrect !',
          });
        }
      }
     
    );
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


annulerReservation() {
      
  const clientId = this.service.getClientInfo();
  if (!clientId) {
    this.toast.error({
      detail: 'Erreur',
      summary: 'Échec de récupération de l’identité du client',
      duration: 5000
    });
    console.error('Client ID is not available or token is invalid');
    this.route.navigate(['/login']);
    return; 
  }

  
  this.service.annulerReservation(clientId, this.id).subscribe({
    next: () => {
      this.toast.success({
        detail: 'Annulation',
        summary: 'Votre réservation a été annulée avec succès',
        duration: 5000
      });
      
      this.route.navigate(['/']); 
    },
    error: (error) => {
      this.toast.error({
        detail: 'Erreur',
        summary: 'Erreur lors de l’annulation de la réservation',
        duration: 5000
      });
      console.error('Error cancelling reservation:', error);
    }
  });
}



}

