import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Tuteur } from '../entities/Tuteur.Entity';
import { CrudService } from '../service/crud.service';
import { SaveTuteur } from '../entities/SaveTuteur.Entity';
import { Domaine } from '../entities/Domaine.Entity';

@Component({
  selector: 'app-register-tuteur',
  templateUrl: './register-tuteur.component.html',
  styleUrls: ['./register-tuteur.component.css']
})
export class RegisterTuteurComponent {
  tuteurForm: FormGroup;
  userRole: string = 'tuteur'; 
  token: string | null = null;
  listdomaine:Domaine[]

  constructor(
    private service: CrudService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router
  ) {
    this.initForm = this.initForm.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);
   }

  ngOnInit(): void {
    this.initForm();
    this.service.getDomaine().subscribe(domaine=>{this.listdomaine=domaine})

  }

  initForm() {
    this.tuteurForm = this.fb.group({ // Changed property name
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      domaine: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]] 
    }, {validator: this.checkPasswords }); 
  }

  checkPasswords = (group: FormGroup): { [key: string]: any } | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };
  
  get nom() { return this.tuteurForm.get('nom'); } 
  get prenom() { return this.tuteurForm.get('prenom'); } 
  get email() { return this.tuteurForm.get('email'); } 
  get password() { return this.tuteurForm.get('password'); } 
  get domiane() { return this.tuteurForm.get('domaine'); }
  
  

  addNewTuteur() {
    if (this.tuteurForm.invalid) {
        this.toast.info({
            detail: 'Veuillez remplir tous les champs du formulaire.',
            summary: 'Champs obligatoires',
            
        });
        return;
    }

    const formData = this.tuteurForm.value; 
    console.log(formData);
    let model = new SaveTuteur();
    model.id = null;
    model.nom = formData.nom;
    model.prenom = formData.prenom;
    model.email = formData.email;
    model.password = formData.password;
    model.idDomaine = +formData.domaine;
    model.etat = false;

    this.service.addTuteur(model).subscribe(
        (res: any) => {
            console.log(res);
           

            
            this.toast.info({
                detail: 'Inscription réussie ! Veuillez vérifier votre e-mail .',
                summary: 'Vérifiez votre e-mail',
                
            });
        },
        (error) => {
            console.error('Erreur lors de l\'inscription :', error);
            this.toast.error({
                detail: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.',
                summary: 'Erreur',
                
            });
        }
    );
}


}
