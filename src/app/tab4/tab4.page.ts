import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesService } from './notes.service';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  constructor(public notesService: NotesService, private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.notesService.load();
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
