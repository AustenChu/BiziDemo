import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, Household} from '../types/network'
import { Note } from '../types/note'
import { Bill } from '../types/bill'
import { Chore } from '../types/chore'
import { Observable, EMPTY, Subject, throwError, timer } from 'rxjs'
import { catchError, tap, switchAll, retryWhen, delayWhen }  from 'rxjs/operators'
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public roommates: string[] = [];

  base_url = 'http://brysonreese.duckdns.org:5000';
  user_routes = ['/api/v1/users', '/api/v1/users/authenticate', '/api/v1/users/email', '/api/v1/users/hid']
  household_routes = ['/api/v1/households', '/api/v1/households/notes', '/api/v1/households/notes/edit', '/api/v1/households/bills', '/api/v1/households/tasks', '/api/v1/households/names']

  constructor(private http: HttpClient) {
  }

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
    return this.http.get<Household>(this.base_url + this.household_routes[0] + hid)
      .pipe(catchError(this.errorHandler))
  }

  add_household(household: string, emails: string[]) {
    return this.http.post<Household>(this.base_url + this.household_routes[0] + '/', {
      name: household,
      members: emails
    })
      .pipe(catchError(this.errorHandler))
  }

  update_household(hid: string, name: string, members?: number[], notes?: JSON[]) {
    return this.http.put<Household>(this.base_url + this.household_routes[0], {
      hid: hid,
      name: name,
      members: members = !members? null : members,
      notes: notes = !notes? null: notes
    })
      .pipe(catchError(this.errorHandler))
  }

  delete_household() {
    return this.http.delete<string>(this.base_url + this.household_routes[0])
      .pipe(catchError(this.errorHandler))
  }

  delete_user_from_household(hid: string, uid: string) {
    return this.http.delete<string>(this.base_url + this.household_routes[0] + uid + '/' + hid)
      .pipe(catchError(this.errorHandler))
  }

  post_notes(hid: string, notes?: Note[]) {
    return this.http.post<Household>(this.base_url + this.household_routes[1] + '/' + hid, {
      notes: notes
    })
      .pipe(catchError(this.errorHandler))
  }

  get_notes(hid: string) {
    return this.http.get<Note[]>(this.base_url + this.household_routes[1] + '/' + hid)
      .pipe(catchError(this.errorHandler))
  }

  delete_notes(hid: string, id?: string) {
    return this.http.put<Household>(this.base_url + this.household_routes[1] + '/' + hid, {
      hid: hid,
      id: id
    })
      .pipe(catchError(this.errorHandler))
  }

  edit_note(hid: string, nid: string, content: string) {
    return this.http.put<Household>(this.base_url + this.household_routes[2] + '/' + hid, {
      id: nid,
      content: content
    })
      .pipe(catchError(this.errorHandler))
  }

  get_bills(hid: string) {
    return this.http.get<Bill[]>(this.base_url + this.household_routes[3] + '/' + hid)
  }

  post_bills(hid: any, bills: Bill[]) {
    return this.http.post<Household>(this.base_url + this.household_routes[3] + '/' + hid, {
      bills: bills
    })
      .pipe(catchError(this.errorHandler))
  }

  delete_bills(hid: string, id: string) {
    return this.http.put<Household>(this.base_url + this.household_routes[3] + '/' + hid, {
      id: id
    })
      .pipe(catchError(this.errorHandler))
  }

  post_chores(hid: string, chores: Chore[]) {
    console.log("chores")
    return this.http.post<Household>(this.base_url + this.household_routes[4] + '/' + hid, {
      tasks: chores
    })
  }

  delete_chores(hid: string, id: string) {
    return this.http.put<Household>(this.base_url + this.household_routes[4] + '/' + hid, {
      id: id
    })
  }

  get_chores(hid: string) {
    return this.http.get<Chore[]>(this.base_url + this.household_routes[4] + '/' + hid)
  }

  get_hid(uid: string) {
    return this.http.get<string>(this.base_url + this.user_routes[3] + '/' + uid)
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message || "Server Error")
  }

  get_roommates(hid: string) {
    return this.http.get<string[]>((this.base_url + this.household_routes[5] + '/' + hid))
  }
}
