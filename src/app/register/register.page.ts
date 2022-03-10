import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


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
    public modalCtrl: ModalController,
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
  }
  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

}
