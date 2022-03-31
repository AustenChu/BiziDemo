import { Component, OnInit } from '@angular/core';
import { Bill } from './bill';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  bills: Bill[] = []
  loaded: boolean = false
  constructor(private alertCtrl: AlertController, private storage: StorageService) {}

  ngOnInit(): void {
    new Promise((resolve) => {
      this.storage.getData('bills').then((bills) => {

          // Only set this.notes to the returned value if there were values stored
          if(bills != null){
            this.bills = bills;
          }

        // This allows us to check if the data has been loaded in or not
        this.loaded = true;
        resolve(true);
      });
    });
  }

  async addBill() {
    this.alertCtrl.create({
      header: 'Add a bill',
      inputs: [
        {
          type: 'text',
          placeholder: 'Enter name of the bill',
          name: 'name'
        },
        {
          type: 'text',
          placeholder: 'Enter amount',
          name: 'amount'
        },
        {
          type: 'text',
          placeholder: 'Enter date due',
          name: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.bills.push({
              name: data.name,
              amount: data.amount,
              date: data.date
            });
            this.save();
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  save() {
    this.storage.setData('bills', this.bills);
  }

}
