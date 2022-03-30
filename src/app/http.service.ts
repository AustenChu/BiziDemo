import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, Household, Message } from './http-types'
import { Observable, Observer, Subject, throwError } from 'rxjs'
import { catchError, map }  from 'rxjs/operators'
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  base_url = 'http://brysonreese.duckdns.org:5000';
  user_routes = ['/api/v1/users', '/api/v1/users/authenticate', '/api/v1/users/email']
  household_route = '/api/v1/households'

  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;

  constructor(private http: HttpClient) {
    this.messages = <Subject<Message>>this.socket_connect("ws://" + this.base_url).pipe(
      map(
        (response: MessageEvent): Message => {
          let data = JSON.parse(response.data)
          return data
        }
      )
    )
   }

  public socket_connect(url): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.socket_create(url);
    } 
    return this.subject;
  }

  private socket_create(url): AnonymousSubject<MessageEvent> {
      let ws = new WebSocket(url);
      let observable = new Observable((obs: Observer<MessageEvent>) => {
          ws.onmessage = obs.next.bind(obs);
          ws.onerror = obs.error.bind(obs);
          ws.onclose = obs.complete.bind(obs);
          return ws.close.bind(ws);
      });
      let observer = {
          error: null,
          complete: null,
          next: (data: Object) => {
              if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify(data));
              }
          }
      };
      return new AnonymousSubject<MessageEvent>(observer, observable);
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
    return throwError(error.error.message || "Server Error")
  }
}
