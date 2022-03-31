import { Component, OnInit } from '@angular/core';
import { Bill } from './bill';
import { Chore } from './chore';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  bills: Bill[] = []
  chores: Chore[] = []
  billsLoaded: boolean = false
  choresLoaded: boolean = false
  constructor(private alertCtrl: AlertController, private storage: StorageService) {}

  ngOnInit(): void {
    this.loadBills()
    this.loadChores()
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
      this.storage.getData('bills').then((bills) => {

          // Only set this.notes to the returned value if there were values stored
          if(bills != null){
            this.bills = bills;
          }

        // This allows us to check if the data has been loaded in or not
        this.billsLoaded = true;
        resolve(true);
      });
    });
  }

  loadChores() {
    new Promise((resolve) => {
      this.storage.getData('chores').then((chores) => {

          // Only set this.notes to the returned value if there were values stored
          if(chores != null){
            this.chores = chores;
          }

        // This allows us to check if the data has been loaded in or not
        this.choresLoaded = true;
        resolve(true);
      });
    });
  }
  
  saveBills() {
    this.storage.setData('bills', this.bills);
  }

  saveChores() {
    this.storage.setData('chores', this.chores)
  }

  

}
