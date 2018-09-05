import { Dialog } from '../../providers/dialog/dialog';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../interfaces/category';

@IonicPage()
@Component({
  selector: 'page-select-date-service',
  templateUrl: 'select-date-service.html',
})
export class SelectDateServicePage {

  categoria: Category;
  dateSeleced: any;
  horaSelected: any;

  constructor(navParams: NavParams, private navCtrl: NavController, private dialog: Dialog) {
    this.categoria = navParams.data.categoria;
  }

  onNext() {
    if (!this.dateSeleced || !this.horaSelected) {
      this.dialog.presentAlert("Campos obrigatório não preenchidos");
    } else {
      let servico = {
        data: this.dateSeleced,
        hora: this.horaSelected,
        servico: this.categoria
      }
      this.navCtrl.push('PaymentServicesPage', { servico: servico })
    }
  }



}
