import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

      const idToken = from(this.storage.getData("id_token").then(data => data).catch(error => false)
)
      if (idToken) {
          const cloned = req.clone({
              headers: req.headers.set("Authorization",
                  "Bearer " + idToken)
          });

          return next.handle(cloned);
      }
      else {
          return next.handle(req);
      }
  }
}
    