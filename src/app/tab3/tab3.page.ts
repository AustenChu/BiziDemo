import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private http: HttpClient) {}

  runHttp() {
    this.http.get('http://brysonreese.duckdns.org:5000/api/v1/users')
      .subscribe(data => {
        console.log(data);
      })
  }

  runHttpPost() {

      let post_url = 'http://brysonreese.duckdns.org:5000/api/v1/users/'

      this.http.post(post_url, {
        name: 'Fate',
        email: 'email',
        password: '123'
      }).toPromise().then((data: any) => {
        console.log(data.token)
      })

  }

}
