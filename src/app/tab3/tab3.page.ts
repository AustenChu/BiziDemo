import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public users = [];
  public errorMsg: string; 

  constructor(private storage: StorageService, private auth: AuthService) {}

  get_jwt() {
    this.auth.isLoggedIn()
    console.log(this.storage.getData("id_token"))
  }

}

