import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User, Household, JWT } from './http-types'
import { Observable, throwError } from 'rxjs'
import { catchError }  from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  base_url = 'http://brysonreese.duckdns.org:5000';
  user_routes = ['/api/v1/users', '/api/v1/users/authenticate']
  household_route = '/api/v1/households'
  constructor(private http: HttpClient) { }

  get_user(uid: string): Observable<User> {
    return this.http.get<User>(this.base_url + this.user_routes[0] + uid)
      .pipe(catchError(this.errorHandler))
  }

  add_user(name: string, email: string, password: string): Observable<string> {
    return this.http.post<string>(this.base_url + this.user_routes[0] + '/', {
      name: name,
      email: email,
      password: password
    })
      .pipe(catchError(this.errorHandler))
  }

  check_password(email: string, password: string) {
    return this.http.post<string>(this.base_url + this.user_routes[1], {
      email: email,
      password: password
    })
      .pipe(catchError(this.errorHandler))
  }

  update_user(uid: string, name: string, email: string, password: string) {
    return this.http.put<User>(this.base_url + this.user_routes[0] + uid, {
      name: name,
      email: email,
      password: password
    })
      .pipe(catchError(this.errorHandler))
  }

  delete_user(uid: string) {
    return this.http.delete<string>(this.base_url + this.user_routes[0] + uid)
      .pipe(catchError(this.errorHandler))
  }

  get_household(hid: string) {
    return this.http.get<Household>(this.base_url + this.household_route + hid)
      .pipe(catchError(this.errorHandler))
  }

  add_household(household: string, emails: string[]) {
    return this.http.post<Household>(this.base_url + this.household_route + '/', {
      name: household,
      members: emails
    })
      .pipe(catchError(this.errorHandler))
  }

  update_household(hid: string, name: string, members?: number[], notes?: JSON[]) {
    return this.http.put<Household>(this.base_url + this.household_route, {
      hid: hid,
      name: name,
      members: members = members === null? null : members,
      notes: notes = notes === null? null: notes
    })
      .pipe(catchError(this.errorHandler))
  }

  delete_household() {
    return this.http.delete<string>(this.base_url + this.household_route)
      .pipe(catchError(this.errorHandler))
  }

  delete_user_from_household(hid: string, uid: string) {
    return this.http.delete<string>(this.base_url + this.household_route + uid + '/' + hid)
      .pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}
