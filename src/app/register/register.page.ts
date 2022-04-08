import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: ''
  email: ''
  password: ''
  loading: any
  constructor(
    private authService: AuthService,
    private networkService: NetworkService,
    private router: Router,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  register() {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.email.match(validRegex)) {
      this.presentLoading()
      this.authService.register(this.name, this.email, this.password).subscribe((data => {
          this.loading.dismiss()
          this.presentAlert("Check email for verification", "", "")
        }),
        error => {
          this.loading.dismiss()
          if (error != "Account already exists") {
            this.presentAlert("Unknown error", "Is the email valid? Do you already have an account?", "Please try again later.")
          }
          else {
            this.presentAlert("Check email for verification", "", "")
          }
        })
    }
    else {
      this.presentAlert("The email is not valid", "", "Please try again")
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async presentAlert(h: string, s: string, m: string) {
    const alert = await this.alertController.create({
      header: h,
      subHeader:s,
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
