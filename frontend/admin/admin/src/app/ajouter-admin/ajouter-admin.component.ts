import { Component } from '@angular/core';
import { Admin } from '../entities/Admin.Entity';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-ajouter-admin',
  templateUrl: './ajouter-admin.component.html',
  styleUrls: ['./ajouter-admin.component.css']
})
export class AjouterAdminComponent {

  AdminForm:FormGroup
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
          Validators.required,
        Validators.email]),
      password: new FormControl('',[
        Validators.required,
      Validators.maxLength(8)]),
    role: new FormControl( '', [
      Validators.required,]),}
     this.AdminForm = this.fb.group(formControls)
   }
   get nom() {return this.AdminForm.get('nom');}
  get prenom() { return this.AdminForm.get('prenom');}
  get email() {return this.AdminForm.get('email');}
  get password() {return this.AdminForm.get('password');}
  get role() { return this.AdminForm.get('role');}

   addNewAdmin() {
    let data = this.AdminForm.value;
    console.log(data);
    let admin = new Admin(
     undefined, data.nom,data.prenom,data.email,data.password,data.role);
    console.log(admin);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0 ||
      data.password == 0 ||
      data.role ==0
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addAdmin(admin).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Administrateur est Envoyé avec succés',
        });

        this.router.navigate(['/listadmin']).then(() => {
          window.location.reload();
        });;
      },
      err=>{
        console.log(err);
        this.toast.error({
          detail: 'Error Message',
          summary: 'Probléme de Serveur',
        }); }
    )

    }
  }


    ngOnInit(): void {
    }

}
