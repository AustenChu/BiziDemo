import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: ''
  password: ''
  constructor(
    private http: HttpClient,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  login() {
    let post_url = 'http://brysonreese.duckdns.org:5000/api/v1/users/authenticate'

      this.http.post(post_url, {
        email: this.email,
        password: this.password
      }).toPromise().then((data: any) => {
        console.log(data.token)
      })
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
