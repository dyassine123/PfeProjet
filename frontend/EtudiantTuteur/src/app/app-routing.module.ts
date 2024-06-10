import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursComponent } from './cours/cours.component';
import { RegisterEtudiantComponent } from './register-etudiant/register-etudiant.component';
import { RegisterTuteurComponent } from './register-tuteur/register-tuteur.component';
import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { LoginTuteurComponent } from './login-tuteur/login-tuteur.component';
import { SelectionComponent } from './selection/selection.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuard } from './service/auth.service';
import { ProfilTuteurComponent } from './profil-tuteur/profil-tuteur.component';
import { AjouterCoursComponent } from './ajouter-cours/ajouter-cours.component';
import { EmailverifierComponent } from './emailverifier/emailverifier.component';
import { ListTuteurComponent } from './list-tuteur/list-tuteur.component';
import { DescriptionCoursComponent } from './description-cours/description-cours.component';
import { CartComponent } from './cart/cart.component';
import { UppdateCoursComponent } from './uppdate-cours/uppdate-cours.component';
import { VerifierEmailTuteurComponent } from './verifier-email-tuteur/verifier-email-tuteur.component';
import { PaimentComponent } from './paiment/paiment.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'registerEtudiant', component: RegisterEtudiantComponent },
  { path: 'registerTuteur', component: RegisterTuteurComponent },
  { path: 'loginEtudiant', component: LoginEtudiantComponent },
  { path: 'loginTuteur', component: LoginTuteurComponent },
  { path: 'select', component: SelectionComponent },
  { path: 'profil/:id', component: ProfilComponent ,canActivate:[AuthGuard] },
  { path: 'profilTuteur/:id', component: ProfilTuteurComponent ,canActivate:[AuthGuard] },
  { path: 'ajoutercours', component: AjouterCoursComponent },
  { path: 'verifier', component: EmailverifierComponent },
  { path: 'listTuteur', component: ListTuteurComponent},
  { path: 'coursDetails/:id', component: DescriptionCoursComponent},
  { path: 'Cart', component: CartComponent},
  { path: 'modifierCours/:id', component: UppdateCoursComponent},
  { path: 'verifierEmail', component: VerifierEmailTuteurComponent },
  { path: 'paiement', component: PaimentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] 
})
export class AppRoutingModule { }
