import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../entities/Categorie.Entity';
import { SaveCours } from '../entities/SaveCour.Entity';
import { CrudService } from '../service/crud.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-uppdate-cours',
  templateUrl: './uppdate-cours.component.html',
  styleUrls: ['./uppdate-cours.component.css']
})
export class UppdateCoursComponent {
  token: string | null = null;
  messageCommande = "";
  UpdateForm: FormGroup;
  userFile: any;
  message = "";
  imagePath: any;
  imgURL: any;
  listcategorie: Categorie[];
  id: number;
  userDetails: any | null = null;
  userRole: string | null = null;

  constructor(
    private services: CrudService,
    private route: Router,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private toast:NgToastService,
  ) {
    this.userDetails = this.services.userDetails();
    this.token = localStorage.getItem('myToken');
    const formControls = {
      nom: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required])
    };
    this.UpdateForm = this.fb.group(formControls);
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      const mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      const reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  get nom() { return this.UpdateForm.get('nom'); }
  get description() { return this.UpdateForm.get('description'); }
  get prix() { return this.UpdateForm.get('prix'); }
  get image() { return this.UpdateForm.get('image'); }
  get categorie() { return this.UpdateForm.get('categorie'); }

  updateCours() {
    const data = this.UpdateForm.value;
    const datas = this.services.getUserInfo();
    const model: SaveCours = {
      id: this.id,
      nom: data.nom,
      description: data.description,
      prix: data.prix,
      image: this.imgURL,
      idCategorie: data.categorie,
      idTuteur: datas?.id
    };

    if (
      !data.nom || !data.description || data.prix === 0 || !data.image || data.categorie === 0
    ) {
      this.toast.info({
        detail: 'Erreur de validation',
        summary: 'Veuillez remplir tous les champs requis!',
      });
    } else {
      this.services.updateCour(this.id, model).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
            Course updated successfully.
          </div>`;
          this.route.navigate(['/cours']);
        },
        err => {
          console.error('Error updating course:', err);
          this.messageCommande = `<div class="alert alert-warning" role="alert">
            Unable to update course. Please try again later.
          </div>`;
        }
      );

      setTimeout(() => {
        this.messageCommande = "";
      }, 3000);
    }
  }

  ngOnInit(): void {
    this.services.getcategorie().subscribe(categorie => {
      this.listcategorie = categorie;
    });

    const storedUserRole = localStorage.getItem('role');
    if (storedUserRole) {
      this.userRole = storedUserRole;
    }

    const idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.services.findCoursById(idEvent).subscribe((result) => {
      console.log(result);
      this.UpdateForm.patchValue({
        nom: result.nom,
        description: result.description,
        prix: result.prix,
        image: result.image,
        categorie: result.categorie.id
      });

      this.imgURL = result.image;
    });
  }
}






