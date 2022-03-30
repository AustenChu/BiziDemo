import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) {
    this.init()
   }

  async init() {
    await this.storage.create();
  }

  setData(key: string, value: any) {
    return this.storage.set(key, value)
  }

  async getData(name: string) {
    return await this.storage.get(name)
  }

  removeData(key: string) {
    return this.storage.remove(key)
  }
}
