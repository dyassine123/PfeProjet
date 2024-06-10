import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { NgToastService } from 'ng-angular-popup';
import { Cours } from '../entities/Cours.Entity';

@Component({
  selector: 'app-description-cours',
  templateUrl: './description-cours.component.html',
  styleUrls: ['./description-cours.component.css']
})
export class DescriptionCoursComponent {


  token: string | null = null;
  id: number;
  event: any = {};
  messageCommande ="";
  userRole: string | null = null;
  isReserved: boolean = false; 
  paymentHandler: any = null;
  listCours: Cours[];
  
 

  constructor(private service:CrudService,private route:Router,private router: ActivatedRoute,private toast: NgToastService, ) {
    
    this.token = localStorage.getItem('myToken'); 
  }

  ngOnInit(): void {
    const idEvent = this.router.snapshot.params['id'];
    this.id = +idEvent; 
    this.service.findCoursById(idEvent).subscribe((result) => {
      this.event = result; 
      console.log(this.event);
      this.service.getCours().subscribe((cours: Cours[]) => {
        this.listCours = cours.filter(cours => cours.categorie.nomCategorie === this.event.categorie.nomCategorie);
        
      });
    });
    const storedUserRole = localStorage.getItem('role');
    if (storedUserRole) {
      this.userRole = storedUserRole;
    }

   
    this.checkReservation();
    this.invokeStripe();
    


  }

  checkReservation() {
    const clientId = this.service.getClientInfo()?.id;
    if (clientId) {
        this.service.checkIfReserved(clientId, this.id).subscribe(isReserved => {
            this.isReserved = isReserved;  
            localStorage.setItem('reserved', this.isReserved.toString());
        }, error => {
            console.error('Error checking reservation status:', error);
        });
    }
}


  reserver(event:any)
  {
    this.messageCommande=`<div class="alert alert-primary" role="alert">
    Veuillez patienter ...
  </div>`
    console.log(event)
    let datas=this.service.getClientInfo()
    let rq:any={}
    rq.idClient=datas?.id 
    rq.idCours=event.id
   
    console.log(rq,"what we senddddd")
    this.service.reserverFromApi(rq).subscribe((data:any)=>{
      
      this.toast.success({
        detail: 'Succès',
        summary: 'Réservé avec succès',
      });
      console.log("Before setting isReserved", this.isReserved);
      this.isReserved = true;
      console.log("After setting isReserved", this.isReserved);
      
     
      
    
      this.messageCommande=`<div class="alert alert-success" role="alert">
    Réservé avec succès
  </div>`
    }, err=>{
      this.messageCommande=`<div class="alert alert-warning" role="alert">
     Erreur, Veuillez réssayer !! 
    </div>`

    })
    setTimeout(() => {
      this.messageCommande=""
    }, 3000);
  }

    connexion()
    {
      this.route.navigate(['/logintouriste'])
    }

    annulerReservation() {
      
      const clientId = this.service.getClientInfo()?.id; 
    
      if (!clientId) {
        this.toast.error({
          detail: 'Erreur',
          summary: 'Échec de récupération de l’identité du client',
          duration: 5000
        });
        console.error('Client ID is not available or token is invalid');
        this.route.navigate(['/login']);
        return;
      }
    
      
      this.service.annulerReservation(clientId, this.id).subscribe({
        next: () => {
          this.toast.success({
            detail: 'Annulation',
            summary: 'Votre réservation a été annulée avec succès',
            duration: 5000
          });
          this.isReserved = false;
          
        },
        error: (error) => {
          this.toast.error({
            detail: 'Erreur',
            summary: 'Erreur lors de l’annulation de la réservation',
            duration: 5000
          });
          console.error('Error cancelling reservation:', error);
        }
      });
    }
    

    makePayment() {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51PEVgaGDdGzu2MH7ehA0RwyGOczHMIeMXVuIyBxXHaWTxg0xiCHI45z1ENcjDjWZBqZNCf3L0oSfZ5ZHqVlc1QV900xjN1lbCQ',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          alert('Stripe token generated!');
        },
      });
      paymentHandler.open({
        name: '',
        description: '',
     
      });
    }
    invokeStripe() {
      if (!window.document.getElementById('stripe-script')) {
        const script = window.document.createElement('script');
        script.id = 'stripe-script';
        script.type = 'text/javascript';
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51Oji5gJWrsLJ8D1xQhzDTIUrYq3rsuU8KMuRYbFelv9NwU46WrvmcOQ16jzLfh08PMwdzsLcq8n9RuVasHPQUlRB00LmTRx2aE',
            locale: 'auto',
            token: function (stripeToken: any) {
              console.log(stripeToken);
              alert('Payment effectuée avec success!');
            },
          });
        };
        window.document.body.appendChild(script);
      }
    }

    

}
