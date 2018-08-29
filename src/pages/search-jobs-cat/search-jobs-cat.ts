import { DialogoProvider } from './../../providers/dialogo/dialogo';
import { ServicosProvider } from './../../providers/servicos/servicos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchJobsCatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-jobs-cat',
  templateUrl: 'search-jobs-cat.html',
})
export class SearchJobsCatPage {

  categorias: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dialogo: DialogoProvider, private servicoProvider: ServicosProvider) {
  }


  ionViewDidLoad() {
    this.servicoProvider.getListCategoreServices().subscribe(res => {
      if (res) {
        console.log(res);
        this.categorias = res
      } else {
        this.dialogo.presentAlert("Loading Faield");
      }
    },err => {
      console.log(err);
    });
  }

  onSelectCategory(cat: any) {
    this.navCtrl.push('ListJobsPage', { data: cat });
  }

}
