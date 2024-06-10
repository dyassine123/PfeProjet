import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Categorie } from '../entities/Categorie.Entity';
import { Domaine } from '../entities/Domaine.Entity';
import { Specialite } from '../entities/Specialite.Entity';

@Component({
  selector: 'app-modifier-cse',
  templateUrl: './modifier-cse.component.html',
  styleUrls: ['./modifier-cse.component.css']
})
export class ModifierCSEComponent {
  activeForm: string | null = null;
  updateFormCategorie: FormGroup;
  updateFormDomaine: FormGroup;
  updateFormSpecialite: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.updateFormCategorie = this.fb.group({
      nomCategorie: ['', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"),
        Validators.minLength(4)
      ]]
    });

    this.updateFormDomaine = this.fb.group({
      nomDomaine: ['', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"),
        Validators.minLength(4)
      ]]
    });

    this.updateFormSpecialite = this.fb.group({
      nomSpecialite: ['', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"),
        Validators.minLength(4)
      ]]
    });
  }

  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findCategorieById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateFormCategorie.patchValue({
        nomCategorie: event.nomCategorie,
        });});
        this.service.findDomaineById(idEvent).subscribe((result) => {
          let event = result;
          console.log(event);
          this.updateFormDomaine.patchValue({
            nomDomaine: event.nomDomaine,
            });});
            this.service.findSpecialiteById(idEvent).subscribe((result) => {
              let event = result;
              console.log(event);
              this.updateFormSpecialite.patchValue({
                nomSpecialite: event.nomSpecialite,
                });});



                const storedUserRole = localStorage.getItem('type');
    if (storedUserRole) {
      this.activeForm = storedUserRole;
    }
  }

  showForm(form: string) {
    this.activeForm = form;
  }

  updateCategorie() {
    let data = this.updateFormCategorie.value;
    let categorie = new Categorie(
      this.id,
      data.nomCategorie
    );

    this.service.updateCategorie(this.id, categorie).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/listdomainespecialite']).then(() => {
        window.location.reload();
      });
    });
  }

  updateDomaine() {
    let data = this.updateFormDomaine.value;
    let domaine = new Domaine(
      this.id,
      data.nomDomaine
    );

    this.service.updateDomaine(this.id, domaine).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/listdomainespecialite']).then(() => {
        window.location.reload();
      });
    });
  }

  updateSpecialite() {
    let data = this.updateFormSpecialite.value;
    let specialite = new Specialite(
      this.id,
      data.nomSpecialite
    );

    this.service.updateSpecilite(this.id, specialite).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/listdomainespecialite']).then(() => {
        window.location.reload();
      });
    });
  }
}

