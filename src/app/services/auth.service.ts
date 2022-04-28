import { Injectable } from '@angular/core';
import { NetworkService } from './network.service'
import { tap } from 'rxjs/operators'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private networkService: NetworkService, private storage: StorageService) {
   }

  public login(email:string, password:string) {
    return this.networkService.check_password(email, password)
    .pipe(tap(
      data => {
        this.setSession(data);
      }))
  }

  public register(name: string, email:string, password:string) {
    return this.networkService.add_user(name, email, password)
    .pipe(tap(
      data => {
          this.setSession(data);
        })) 
  }

  private setSession(authResult) {

    this.storage.setData('id_token', authResult)
  }

  logout() {
    this.storage.removeData('id_token');
  }

  public async isLoggedIn() {
    const expiry = await this.storage.getData('id_token').then(value => (Number(atob(value.split('.')[1])))).catch(value => value)
    console.log(expiry)
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
