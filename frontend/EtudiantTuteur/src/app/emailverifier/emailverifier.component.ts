import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Client } from '../entities/Client.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-emailverifier',
  templateUrl: './emailverifier.component.html',
  styleUrls: ['./emailverifier.component.css']
})
export class EmailverifierComponent {
  resetForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,
    private toast:NgToastService
  ){ 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
      Validators.email]),}
      this.resetForm = this.fb.group(formControls)
}
get email() {return this.resetForm.get('email');}

resetmdpclt() {
  let data = this.resetForm.value;
  console.log(data);
  let client = new Client(
    data.null, data.null,data.null,data.email,data.null,data.null,data.null);
  console.log(client);

  if (
    data.email == 0
  ) {
    this.toast.info({
      detail: 'Error Message',
      summary: 'Champs obligatoire',
    });
  } else {
  this.service.resetMdpClient(client).subscribe(
    res=>{
      console.log(res);
      this.toast.error({
        detail: 'Error Message',
        summary: 'Probléme de Serveur',
      });

    },
    err=>{
      console.log(err);
      this.toast.success({
        detail: 'Succes Message',
        summary: 'Connexion avec succés',

      }); 
      this.router.navigate(['/loginClient']);

    }
  )

  }
}

  ngOnInit(): void {
  }
}
