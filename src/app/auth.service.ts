import { Injectable } from '@angular/core';
import { HttpService } from './http.service'
import { tap, shareReplay } from 'rxjs/operators'
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isError = false;
  private _storage: Storage | null = null;

  constructor(private httpService: HttpService, private storage: Storage) {
    this.init()
   }
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;   
  }

  public login(email:string, password:string) {
    return this.httpService.check_password(email, password)
    .pipe(tap(
      data => {
        this.setSession(data);
        this.isError = false;
      }, 
        error => this.isError = true),
    shareReplay())  
  }

  public register(name: string, email:string, password:string) {
    return this.httpService.add_user(name, email, password)
    .pipe(tap(
      data => {
          this.setSession(data);
          this.isError = false;
        }, 
        error => this.isError = true),
    shareReplay())  
  }

  private setSession(authResult) {

    this._storage.set('id_token', authResult)
  }

  logout() {
    this._storage.remove('id_token');
  }

  public async isLoggedIn() {
    const expiry = await this._storage.get('id_token').then(value => (Number(atob(value.split('.')[1])))).catch(value => value)
    //if there is a JWT in storage, returns the expiration of that data as a number. Else, returns an error
    if (typeof(expiry) === 'number') {
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    return false
  }

  public isLoggedOut () {
    return !this.isLoggedIn()
  }
}
