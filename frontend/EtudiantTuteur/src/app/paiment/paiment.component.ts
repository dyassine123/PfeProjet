import { Component } from '@angular/core';

@Component({
  selector: 'app-paiment',
  templateUrl: './paiment.component.html',
  styleUrls: ['./paiment.component.css']
})
export class PaimentComponent {
  
  paymentHandler: any = null;
  constructor() {}
  ngOnInit() {
    this.invokeStripe();
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
