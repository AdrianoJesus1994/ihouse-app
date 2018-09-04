import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Category } from '../../interfaces/category';

@IonicPage()
@Component({
  selector: 'page-categoria-servicos',
  templateUrl: 'categoria-servicos.html',
})
export class CategoriaServicosPage {
  categorias: Category[] = [];

  constructor(private navCtrl: NavController, private dialogo: DialogoProvider, private database: DatabaseProvider) { }

  ionViewDidLoad(): void {
    this.dialogo.showLoading();
    this.database.getListCategoreServices<Category>().subscribe((res) => {
      this.dialogo.hideLoading();
      this.categorias = res;
    }, (err) => {
      console.log(err);
      this.dialogo.presentAlert(err.message);
    })
  }

  onSelectCategory(category: Category): void {
    console.log(category);
    this.navCtrl.push('SelectDateServicePage', { categoria: category });
  }

}
