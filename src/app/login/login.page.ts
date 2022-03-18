import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController} from '@ionic/angular';
import { AuthService } from '../auth.service'
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
    this.presentLoading()
    this.authService.login(this.email, this.password).subscribe((data => {
      this.loading.dismiss()
      this.router.navigate(['../tabs/tab3'])
      this.dismiss()
    }),
    error => {
      this.loading.dismiss()
      this.presentAlert(error)
    })
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async presentAlert(error: string) {
    const alert = await this.alertController.create({
      header: (error === "wrong credentials" ? "The username or password is incorrect" : "Unknown error"),
      message: (error === "wrong credentials" ? "Please try again" : "Please try again later"),
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
