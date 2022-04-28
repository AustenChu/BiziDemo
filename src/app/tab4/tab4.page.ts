import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { NetworkService } from '../services/network.service'
import { StorageService } from '../services/storage.service'


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  hid: string

  constructor(public notesService: NotesService, private alertCtrl: AlertController, private networkService: NetworkService, private storage: StorageService) {
  }

  async ionViewWillEnter() {
    await this.storage.getData('hid').then(value => this.hid = value)
    setTimeout(() => {
      this.notesService.load(this.hid);
    }, 500)
  }

  save() {
    this.notesService.load(this.hid);
  }

  addNote(){
    this.alertCtrl.create({
      header: 'New Note',
      message: 'What should the title of this note be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.notesService.createNote(data.title, this.hid);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  loadNotes() {
    this.notesService.load(this.hid)
  }
}
