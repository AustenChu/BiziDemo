import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-household-management',
  templateUrl: './household-management.page.html',
  styleUrls: ['./household-management.page.scss'],
})
export class HouseholdManagementPage implements OnInit {

  emails: any[] = [];
  household=''
  constructor(private http: HttpClient ) { }

  ngOnInit() {
    this.emails.push('')
  }
  
  addNewEmail() {
    this.emails.push('');
  }

  deleteEmail() {
  this.emails.pop();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  submit() {
    console.log(this.household)
    console.log(this.emails)
    this.http.post('http://brysonreese.duckdns.org:5000/api/v1/households/', {
      name: this.household,
      members: this.emails
    }).toPromise().then((data: any) => {
      console.log(data)
    })
  }

}
