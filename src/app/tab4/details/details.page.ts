import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Location } from '@angular/common'
import { Note } from '../../types/note';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public note: Note;

  constructor(private _location: Location, private route: ActivatedRoute, private notesService: NotesService, private navCtrl: NavController) {
    this.note = {
      id: '',
      title: '',
      content: ''
    };
  }

  ngOnInit() {

    // Get the id of the note from the URL
    let noteId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if(this.notesService.loaded){
      this.note = this.notesService.getNote(noteId)
    } 
    else {
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(noteId)
      });
    }
  }

  noteChanged(){
    this.notesService.save();
  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    this.navCtrl.setDirection("back", true, "back");
    this._location.back();
  }

}