import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursComponent } from './cours/cours.component';
import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { LoginTuteurComponent } from './login-tuteur/login-tuteur.component';
import { RegisterEtudiantComponent } from './register-etudiant/register-etudiant.component';
import { RegisterTuteurComponent } from './register-tuteur/register-tuteur.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectionComponent } from './selection/selection.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilTuteurComponent } from './profil-tuteur/profil-tuteur.component';
import { Header2Component } from './header2/header2.component';
import { AjouterCoursComponent } from './ajouter-cours/ajouter-cours.component';
import { EmailverifierComponent } from './emailverifier/emailverifier.component';
import { ListTuteurComponent } from './list-tuteur/list-tuteur.component';
import { DescriptionCoursComponent } from './description-cours/description-cours.component';
import { CartComponent } from './cart/cart.component';
import { UppdateCoursComponent } from './uppdate-cours/uppdate-cours.component';
import { VerifierEmailTuteurComponent } from './verifier-email-tuteur/verifier-email-tuteur.component';
import { PaimentComponent } from './paiment/paiment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CoursComponent,
    LoginEtudiantComponent,
    LoginTuteurComponent,
    RegisterEtudiantComponent,
    RegisterTuteurComponent,
    HeaderComponent,
    FooterComponent,
    SelectionComponent,
    ProfilComponent,
    ProfilTuteurComponent,
    Header2Component,
    AjouterCoursComponent,
    EmailverifierComponent,
    ListTuteurComponent,
    DescriptionCoursComponent,
    CartComponent,
    UppdateCoursComponent,
    VerifierEmailTuteurComponent,
    PaimentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
