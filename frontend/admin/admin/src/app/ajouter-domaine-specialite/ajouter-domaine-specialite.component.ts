import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-ajouter-domaine-specialite',
  templateUrl: './ajouter-domaine-specialite.component.html',
  styleUrls: ['./ajouter-domaine-specialite.component.css']
})
export class AjouterDomaineSpecialiteComponent implements OnInit {
  DomaineForm: FormGroup;
  SpecialiteForm: FormGroup;
  CategorieForm : FormGroup;

  constructor(private service: CrudService, private router: Router, private fb: FormBuilder, private toast: NgToastService) {

    this.DomaineForm = this.fb.group({
      nomDomaine: ['', [Validators.required]] 
    });
    this.SpecialiteForm = this.fb.group({
      nomSpecialite: ['', [Validators.required]] 
    });

    this.CategorieForm = this.fb.group({
      nomCategorie: ['', [Validators.required]] 
    });
  }


  get nomDomaine() { return this.DomaineForm.get('nomDomaine'); }
  get nomSpecialite() { return this.SpecialiteForm.get('nomSpecialite'); }
  get nomCategorie() { return this.CategorieForm.get('nomCategorie'); }

  ngOnInit(): void {
  }

  addNewDomaine() {
    let data = this.DomaineForm.value;
    if (this.DomaineForm.valid) {
      this.service.addDomaine(data).subscribe(
        res => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'expertise ajouté avec succès',
          });
        
        },
        err => {
          this.toast.error({
            detail: 'Error Message',
            summary: 'Le nom de la Expertise a déjà été enregistré',
          });
        }
      );
    } else {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Le nom du expertise est obligatoire',
      });
    }
  }

  addNewSpecialite() {
    let data = this.SpecialiteForm.value;
    if (this.SpecialiteForm.valid) {
      this.service.addSpecialite(data).subscribe(
        res => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'Spécialité ajoutée avec succès',
          });
        
        },
        err => {
          this.toast.error({
            detail: 'Error Message',
            summary: 'Le nom de la Specialite a déjà été enregistré',
          });
        }
      );
    } else {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Le nom de la spécialité est obligatoire',
      });
    }
  }


  addNewCategorie() {
    let data = this.CategorieForm.value;
    if (this.CategorieForm.valid) {
      this.service.addCategorie(data).subscribe(
        res => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'Categorie ajouté avec succès',
          });
        
        },
        err => {
          this.toast.error({
            detail: 'Error Message',
            summary: 'Le nom de la categorie a déjà été enregistré',
          });
        }
      );
    } else {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Le nom du categorie est obligatoire',
      });
    }
  }
}



