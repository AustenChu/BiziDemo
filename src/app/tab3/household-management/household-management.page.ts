import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-household-management',
  templateUrl: './household-management.page.html',
  styleUrls: ['./household-management.page.scss'],
})
export class HouseholdManagementPage implements OnInit {

  emails: any[] = [];
  household=''
  constructor(private httpService: HttpService ) { }

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
    this.httpService.add_household(this.household, this.emails)
      .subscribe(data => console.log(data))
  }

}
