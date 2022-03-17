import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.name, this.email, this.password).subscribe(data => {
      if (!this.authService.isError) {
        this.dismiss();
        this.router.navigate(['../tabs/tab3']);
      }
    })
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}
