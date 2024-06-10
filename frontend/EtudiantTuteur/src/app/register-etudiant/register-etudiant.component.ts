import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Client } from '../entities/Client.Entity';
import { CrudService } from '../service/crud.service';
import { Specialite } from '../entities/Specialite.Entity';
import { SaveClient } from '../entities/SaveClientEntity';

@Component({
  selector: 'app-register-etudiant',
  templateUrl: './register-etudiant.component.html',
  styleUrls: ['./register-etudiant.component.css']
})
export class RegisterEtudiantComponent {
  clientForm: FormGroup;
  userRole: string = 'etudiant';
  token: string | null = null;
  listSpecialite: Specialite[]=[];
  showSpinner: boolean = false;
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
    this.service.getSpecialites().subscribe(specialite => {
      this.listSpecialite = specialite;
    });
  }

  initForm() {
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      specialite: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]] 
    }, {validator: this.checkPasswords }); 
  }

  checkPasswords = (group: FormGroup): { [key: string]: any } | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };
  
  
  

  
  get nom() { return this.clientForm.get('nom'); }
  get prenom() { return this.clientForm.get('prenom'); }
  get email() { return this.clientForm.get('email'); }
  get password() { return this.clientForm.get('password'); }
  get specialite() { return this.clientForm.get('specialite'); }

  addNewClient() {
    if (this.clientForm.invalid) {
      this.toast.info({
        detail: 'Veuillez remplir tous les champs du formulaire.',
        summary: 'Champs obligatoires'
      });
      return;
    }
  
    const formData = this.clientForm.value;
    console.log(formData);
    let model = new SaveClient();
    model.id = null;
    model.nom = formData.nom;
    model.prenom = formData.prenom;
    model.email = formData.email;
    model.password = formData.password;
    model.idSpecialite = +formData.specialite;
    model.etat = false;
  
  
    this.service.addClient(model).subscribe(
      (res: any) => {
        console.log(res);
        let token = res.token;
        localStorage.setItem("myToken", token);
        localStorage.setItem("role", 'etudiant');
  
      
        this.toast.info({
          detail: 'Inscription réussie ! Veuillez vérifier votre e-mail pour activer votre compte.',
          summary: 'Vérifiez votre e-mail',
        });
  
      },
      (error) => {
        console.error('Erreur lors de l\'inscription :', error);
        
        this.toast.info({
          detail: 'Inscription réussie ! Veuillez vérifier votre e-mail pour activer votre compte.',
          summary: 'Vérifiez votre e-mail',
        });
      }
    );
  }
  

}
