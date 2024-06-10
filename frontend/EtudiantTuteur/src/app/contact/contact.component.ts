import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Contact } from '../entities/Contact.Entity';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  token: string | null = null;

  constructor(
    private service: CrudService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router
    
      
    
  ) {this.token = localStorage.getItem('myToken')  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      sujet: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  get nom() { return this.contactForm.get('nom'); }
  get email() { return this.contactForm.get('email'); }
  get sujet() { return this.contactForm.get('sujet'); }
  get message() { return this.contactForm.get('message'); }

  addNewContact() {
    if (this.contactForm.invalid) {
      this.toast.info({
        detail: 'Veuillez remplir tous les champs du formulaire.',
        summary: 'Champs obligatoires'
      });
      return;
    }

    const formData = this.contactForm.value;
    const contact = new Contact(
      undefined,
      formData.nom,
      formData.email,
      formData.sujet,
      formData.message
    );

    this.service.addContact(contact).subscribe(
      () => {
        this.toast.success({
          detail: 'Votre message a été envoyé avec succès.',
          summary: 'Succès'
        });
        this.contactForm.reset();
        // Peut-être rediriger vers une page de confirmation ou de remerciement
        // this.router.navigate(['/confirmation']);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du message :', error);
        this.toast.error({
          detail: 'Une erreur est survenue. Veuillez réessayer plus tard.',
          summary: 'Erreur'
        });
      }
    );
  }
}

