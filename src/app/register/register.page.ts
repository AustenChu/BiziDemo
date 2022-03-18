import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private router: Router,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  register() {
    this.presentLoading()
    this.authService.register(this.name, this.email, this.password).subscribe((data => {
        this.loading.dismiss()
        this.dismiss();
        this.router.navigate(['../tabs/tab3']);
      }),
      error => {
        this.loading.dismiss()
        this.presentAlert()
      })
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Unknown error",
      message: "Please try again later",
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
