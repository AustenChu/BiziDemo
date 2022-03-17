import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    public modalCtrl: ModalController,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.name, this.email, this.password).subscribe((data => {
        this.dismiss();
        this.router.navigate(['../tabs/tab3']);
      }),
      error => {
        this.presentAlert()
      })
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: "Unknown error",
      message: "Please try again later",
      buttons: ['OK']
    })
    
    await alert.present();
  }
  

}
