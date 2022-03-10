import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab3PageModule } from '../tab3/tab3.module';
import { Tab1Page } from '../tab1/tab1.page';
import { WelcomePage } from '../welcome/welcome.page';
import { Tab5Page } from '../tab5/tab5.page';


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
    private http: HttpClient,
    private router: Router,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  register() {
    let post_url = 'http://brysonreese.duckdns.org:5000/api/v1/users/'

      this.http.post(post_url, {
        name: this.name,
        email: this.email,
        password: this.password
      }).toPromise().then((data: any) => {
        console.log(data.token)
      })

    this.router.navigate(['../tabs/tab3']);
  }
  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

}
