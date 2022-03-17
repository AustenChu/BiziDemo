import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(data => {
      if (!this.authService.isError) {
        this.dismiss()
        this.router.navigate(['../tabs/tab3'])
      }
    })
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
