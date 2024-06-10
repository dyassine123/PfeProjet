import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { LoginComponent } from './login/login.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListTuteurComponent } from './list-tuteur/list-tuteur.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ListLessonComponent } from './list-lesson/list-lesson.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { AjouterDomaineSpecialiteComponent } from './ajouter-domaine-specialite/ajouter-domaine-specialite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { ListDomaineSpecialiteComponent } from './list-domaine-specialite/list-domaine-specialite.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfilComponent } from './profil/profil.component';
import { ModifierCSEComponent } from './modifier-cse/modifier-cse.component';
@NgModule({
  declarations: [
    AppComponent,
    AjouterAdminComponent,
    ListAdminComponent,
    LoginComponent,
    ListClientComponent,
    ListTuteurComponent,
    ListCoursComponent,
    ListLessonComponent,
    ListContactComponent,
    AjouterDomaineSpecialiteComponent,
    ListDomaineSpecialiteComponent,
    ModifierAdminComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ProfilComponent,
    ModifierCSEComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
