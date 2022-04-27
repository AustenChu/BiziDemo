import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private storage: StorageService) {}
  clearJWT() { this.storage.removeData('id_token'); }
}
