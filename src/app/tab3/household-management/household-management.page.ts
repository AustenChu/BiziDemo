import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service'
import { AlertController, LoadingController} from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-household-management',
  templateUrl: './household-management.page.html',
  styleUrls: ['./household-management.page.scss'],
})
export class HouseholdManagementPage implements OnInit {

  emails: any[] = [];
  household=''
  loading: any
  hid=''
  email_to_delete=''

  constructor(private storage: StorageService, private networkService: NetworkService, private alertController: AlertController, private loadingController: LoadingController) { }

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

  async remove_user() {
    await this.storage.getData('hid').then(hid => {
      this.hid = hid
    })
    console.log(this.hid)
    console.log(this.email_to_delete)
    this.networkService.delete_user_from_household(this.hid, this.email_to_delete).subscribe(
      data => {
        console.log("done")
      }
    )
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
