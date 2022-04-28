import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { NetworkService } from '../../services/network.service'
import { StorageService } from '../../services/storage.service'
import { Location } from '@angular/common'
import { Note } from '../../types/note';
import { catchError, tap } from 'rxjs/operators';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public note: Note;
  private hid: string;

  constructor(private _location: Location, private route: ActivatedRoute, private notesService: NotesService, private navCtrl: NavController, private storage: StorageService) {
    this.note = {
      id: '',
      title: '',
      content: ''
    };
  }

  async ionViewWillEnter() {
    await this.storage.getData('hid').then(value => this.hid = value)
  }
  
  async ngOnInit() {
    await this.storage.getData('hid').then(value => this.hid = value)

    // Get the id of the note from the URL
    let noteId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if(this.notesService.loaded){
      this.note = this.notesService.getNote(noteId)
    } 
    else {
      this.notesService.load(this.hid).then(() => {
        this.note = this.notesService.getNote(noteId)
      });
    }
  }

  noteChanged(){
    this.notesService.save(this.note, this.hid);
  }

  deleteNote(){
    this.notesService.deleteNote(this.note.id, this.hid);
    this.navCtrl.setDirection("back", true, "back");
    this._location.back();
  }
}