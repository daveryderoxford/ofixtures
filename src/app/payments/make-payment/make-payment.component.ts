import { Component, OnInit, HostListener, inject } from '@angular/core';
import { PaymentService } from '../payment.service';
import { input } from "@angular/core";

declare var StripeCheckout: StripeCheckoutStatic;

/** Button component that displays stripe payment dialog that captures card details and saves entry
     details on the headend that triggers charging the card */
@Component( {
    selector: 'make-payment',
    templateUrl: './make-payment.component.html',
    styleUrls: ['./make-payment.component.scss'],
    standalone: false
} )
export class MakePaymentComponent implements OnInit {
   private paymentSvc = inject(PaymentService);

   amount = input.required<number>();

   handler: any;

   ngOnInit() {
      this.handler = StripeCheckout.configure( {
         key: 'sk_test_BF573NobVn98OiIsPAv7A04K',
       //  image: '/your/awesome/logo.jpg',
         locale: 'auto',
         token: token => {
            this.paymentSvc.processPayment( token, this.amount() );
         }
      } );
   }

   handlePayment() {
      this.handler.open( {
         name: 'Splitsbrowser',
         excerpt: 'Event entry payment',
         amount: this.amount()
      } );
   }

   @HostListener( 'window:popstate' )
   onPopstate() {
      this.handler.close();
   }
}
