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

  public hid: string;
  public users = [];
  public errorMsg: string;
  public roommates = [];

  constructor(private storage: StorageService, private auth: AuthService, private network: NetworkService) {}

  async ionViewWillEnter() {
    const uid = await this.storage.getData('uid').then(value => value)
    new Promise((resolve) => {
      this.network.get_hid(uid).subscribe((hid) => {
        this.storage.setData('hid', hid['hid'])
      })
    })
    await this.storage.getData('hid').then(hid => {
      this.hid = hid
    })
    this.network.get_roommates(this.hid).subscribe((roommates) => {
      this.roommates = roommates
    })
  }

  get_jwt() {
    this.auth.isLoggedIn()
  }

}

