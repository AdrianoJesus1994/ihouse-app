import { Injectable } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

const PAYPAL_PRODUCTION_CLIENT_ID = "";
const PAYPAL_SANDBOX_CLIENT_ID = "";

@Injectable()
export class PaypalProvider {
  constructor(private payPal: PayPal) { }

  openPayment(amount: string, currency: string, shortDescription: string, intent: string): void {
    this.payPal.init({
      PayPalEnvironmentProduction: PAYPAL_PRODUCTION_CLIENT_ID,
      PayPalEnvironmentSandbox: PAYPAL_SANDBOX_CLIENT_ID
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(amount, currency, shortDescription, intent);
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
