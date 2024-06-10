import { Component } from '@angular/core';
import { Tuteur } from '../entities/Tuteur.Entity';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login-tuteur',
  templateUrl: './login-tuteur.component.html',
  styleUrls: ['./login-tuteur.component.css']
})
export class LoginTuteurComponent {
  loginForm: FormGroup
  userRole: string = 'tuteur';
  token: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,
    private toast:NgToastService
  ) { 
    this.token = localStorage.getItem('myToken') 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
        
      ]),
      password: new FormControl('',[
        Validators.required,
       
      ])
    }

    this.loginForm = this.fb.group(formControls)
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
  ngOnInit(): void { 
  }

  login() {
    let data = this.loginForm.value;
    let tuteur = new Tuteur(null, null, null, data.email, data.password);
    if (data.email == 0 || data.password == 0) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.loginTuteur(tuteur).subscribe(
        res => {
          this.token = res.token;
          localStorage.setItem("myToken", res.token);
          localStorage.setItem("role", "tuteur");
          this.router.navigate(['']).then(() => window.location.reload());
        },
        err => {
          
          if (err.error.message === "Votre compte est désactivé") {
            this.toast.error({
              detail: 'Error Message',
              summary: 'Votre compte est désactivé',
            });
          } else {
           
            this.toast.error({
              detail: 'Error Message',
              summary: 'Problème de Serveur',
            });
          }
        }
      )
    }
  }
  

}
