import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service'
import { AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-household-management',
  templateUrl: './household-management.page.html',
  styleUrls: ['./household-management.page.scss'],
})
export class HouseholdManagementPage implements OnInit {

  emails: any[] = [];
  household=''
  loading: any

  constructor(private networkService: NetworkService, private alertController: AlertController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.emails.push('')
  }
  
  addNewEmail() {
    this.emails.push('');
  }

  deleteEmail() {
    this.emails.pop();

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  submit() {
    this.presentLoading()
    this.networkService.add_household(this.household, this.emails)
      .subscribe(data => {
        this.loading.dismiss();
        this.presentAlert("Household added", "", "")
      },
      (error => {
        this.presentAlert("Unknown error", "", "Plese try again later")
      }))
  }

  async presentAlert(h: string, s: string, m: string) {
    const alert = await this.alertController.create({
      header: h,
      subHeader: s,
      message: m,
      buttons: ['OK']
    })
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

}
