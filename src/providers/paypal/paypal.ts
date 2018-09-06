import { Injectable } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Dialog } from '../dialog/dialog';

const PAYPAL_PRODUCTION_CLIENT_ID = "";
const PAYPAL_SANDBOX_CLIENT_ID = "access_token$sandbox$y98m3wy9q6dfbmn5$ea84cb68d83431462281b4e173950020";
const DEV_ENVIRONMENT = "PayPalEnvironmentSandbox";
const PROD_ENVIRONMENT = "PayPalEnvironmentProduction";

@Injectable()
export class PaypalProvider {
  constructor(private payPal: PayPal, private dialog: Dialog) { }

  openPayment(amount: string, currency: string, shortDescription: string, intent: string): void {
    this.payPal.init({
      PayPalEnvironmentProduction: PAYPAL_PRODUCTION_CLIENT_ID,
      PayPalEnvironmentSandbox: PAYPAL_SANDBOX_CLIENT_ID
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender(DEV_ENVIRONMENT, new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(amount, currency, shortDescription, intent);
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
          this.dialog.presentAlert('Payment was successful');
        }, (err) => {
          // Error or render dialog closed without being successful
          console.log('ERROR:RENDER', err);
        });
      }, (err) => {
        // Error in configuration
        console.log('ERROR:CONFIGURATION', err);
      });
    }, (err) => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log('ERROR:INIT', err);
    });
  }
}
