import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
  error: ''

  constructor(
    private authService: AuthService,
    private router: Router,
    public modalCtrl: ModalController,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe((data => {
      this.dismiss()
      this.router.navigate(['../tabs/tab3'])
    }),
    error => {
      this.presentAlert(error)
    })
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async presentAlert(error) {
    const alert = await this.alert.create({
      header: (error === "no email found" || error === "no password found" ? "The username or password is incorrect" : "Unknown error"),
      message: "Please try again",
      buttons: ['OK']
    })

    await alert.present();
  }
}
