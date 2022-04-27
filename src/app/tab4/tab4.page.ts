import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { NetworkService } from '../services/network.service'


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(public notesService: NotesService, private alertCtrl: AlertController, networkService: NetworkService) {
    this.notesService.load();
  }

  ionViewWillEnter() {
    this.notesService.load();
  }

  save() {
    this.notesService.load();
  }

  refresh() {
    this.notesService.load()
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
            this.notesService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  loadNotes() {
    this.notesService.load()
  }
}
