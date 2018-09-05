import { Dialog } from '../../providers/dialog/dialog';
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

  constructor(private navCtrl: NavController, private dialog: Dialog, private database: DatabaseProvider) { }

  ionViewDidLoad(): void {
    this.dialog.showLoading();
    this.database.getListCategoreServices<Category>().subscribe((res) => {
      this.dialog.hideLoading();
      this.categorias = res;
    }, (err) => {
      console.log(err);
      this.dialog.presentAlert(err.message);
    })
  }

  onSelectCategory(category: Category): void {
    console.log(category);
    this.navCtrl.push('SelectDateServicePage', { categoria: category });
  }

}
