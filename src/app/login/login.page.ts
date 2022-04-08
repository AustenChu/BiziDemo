import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController} from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: ''
  password: ''
  loading: any

  constructor(
    private authService: AuthService,
    private router: Router,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  login() {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.email.match(validRegex)) {
      this.presentLoading()
      this.authService.login(this.email, this.password).subscribe((data => {
        this.loading.dismiss()
        this.router.navigate(['../tabs/tab3'])
        this.dismiss()
      }),
      error => {
        this.loading.dismiss()
        let h = ''
        let m = ''
        if (error === "wrong credentials") {
          h = "The username or password is incorrect";
          m = "Please try again";
        }
        else {
          h = "Unknown error"
          m = "Please try again later"
        }
        this.presentAlert(h, "", m)
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
