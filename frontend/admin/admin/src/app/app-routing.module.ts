import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { LoginComponent } from './login/login.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListTuteurComponent } from './list-tuteur/list-tuteur.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ListLessonComponent } from './list-lesson/list-lesson.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { AjouterDomaineSpecialiteComponent } from './ajouter-domaine-specialite/ajouter-domaine-specialite.component';
import { ListDomaineSpecialiteComponent } from './list-domaine-specialite/list-domaine-specialite.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { AuthGuard } from './Service/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { ModifierCSEComponent } from './modifier-cse/modifier-cse.component';

const routes: Routes = [
  { path: 'ajouteradmin', component: AjouterAdminComponent,canActivate:[AuthGuard] },
  { path: 'listadmin', component: ListAdminComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'listclient', component: ListClientComponent,canActivate:[AuthGuard] },
  { path: 'listtuteur', component: ListTuteurComponent,canActivate:[AuthGuard] },
  { path: 'listcours', component: ListCoursComponent,canActivate:[AuthGuard] },
  { path: 'listlesson', component: ListLessonComponent,canActivate:[AuthGuard] },
  { path: 'listcontact', component: ListContactComponent,canActivate:[AuthGuard] },
  { path: 'ajouterdomainespecialite', component: AjouterDomaineSpecialiteComponent,canActivate:[AuthGuard] },
  { path: 'listdomainespecialite', component: ListDomaineSpecialiteComponent,canActivate:[AuthGuard] },
  { path: 'modifieradmin/:id', component: ModifierAdminComponent,canActivate:[AuthGuard] },
  { path: '', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'profil/:id', component: ProfilComponent,canActivate:[AuthGuard] },
  { path: 'UpdateCES/:id', component: ModifierCSEComponent,canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

