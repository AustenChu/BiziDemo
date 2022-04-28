import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service'
import { NetworkService } from '../services/network.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public users = [];
  public errorMsg: string; 

  constructor(private storage: StorageService, private auth: AuthService, private network: NetworkService) {}

  async ionViewWillEnter() {
    const uid = await this.storage.getData('uid').then(value => value)
    new Promise((resolve) => {
      this.network.get_hid(uid).subscribe((hid) => {
        this.storage.setData('hid', hid['hid'])
      })
    })
    await this.storage.getData('hid').then(hid => {
      return 0
    })
  }

  get_jwt() {
    this.auth.isLoggedIn()
  }

}

