import { Component, OnInit } from '@angular/core';
import { Bill } from '../types/bill';
import { Chore } from '../types/chore';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { NetworkService } from '../services/network.service'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  bill: Bill
  chore: Chore
  bills: Bill[] = []
  chores: Chore[] = []
  hid: string
  billsLoaded: boolean = false
  choresLoaded: boolean = false
  constructor(private alertCtrl: AlertController, private storage: StorageService, private network: NetworkService, private http: HttpClient) {}

  async ionViewWillEnter() {
    this.hid = await this.storage.getData('hid').then(value => value)
    this.load()
  }

  async addBill() {
    this.alertCtrl.create({
      header: 'Add a bill',
      inputs: [
        {
          type: 'text',
          placeholder: 'Enter Bill',
          name: 'name'
        },
        {
          type: 'text',
          placeholder: 'Enter Amount',
          name: 'amount'
        },
        {
          type: 'text',
          placeholder: 'Enter Due Date',
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
            this.saveBills();
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  async addChore() {
    this.alertCtrl.create({
      header: 'Add a chore',
      inputs: [
        {
          type: 'text',
          placeholder: 'Enter Chore',
          name: 'name'
        },
        {
          type: 'text',
          placeholder: 'Enter Roommate',
          name: 'roomate'
        },
        {
          type: 'text',
          placeholder: 'Enter Due Date',
          name: 'day'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.chores.push({
              name: data.name,
              roomate: data.roomate,
              day: data.day
            });
            this.saveChores();
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  load() {
    this.loadBills()
    this.loadChores()
  }

  loadBills() {
    new Promise((resolve) => {
      this.network.get_bills(this.hid).subscribe((bills) => {
         //This allows us to check if the data has been loaded in or not
        this.bills = bills;
        resolve(true);
      });
    });
  }

  loadChores() {
    new Promise((resolve) => {
      this.network.get_chores(this.hid).subscribe((chores) => {
         //This allows us to check if the data has been loaded in or not
        this.chores = chores;
        resolve(true);
      });
    });
  }
  
  saveBills() {
    let a = []
    a[0] = this.bills[this.bills.length - 1]
    new Promise((resolve) => {
      this.network.post_bills(this.hid, a).subscribe((bills) => {
        resolve(true);
      })
    })
  }

  saveChores() {
    let a = []
    a[0] = this.chores[this.chores.length - 1]
    new Promise((resolve) => {
      this.network.post_chores(this.hid, a).subscribe((chores) => {
        resolve(true);
      })
    })
  }
  
  deleteBill(bill: Bill) {
     new Promise((resolve) => {
        this.network.delete_bills(this.hid, bill.id).subscribe(bills => {
          resolve(true)  
        })
      })
    setTimeout(()=>{                           
      this.load();
    }, 500);
  }

  deleteChore(chore: Chore) {
     new Promise((resolve) => {
        this.network.delete_chores(this.hid, chore.id).subscribe(chores => {
          resolve(true)  
        })
      })
  }
}
