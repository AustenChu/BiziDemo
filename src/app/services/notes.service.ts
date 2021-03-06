import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Note } from '../types/note'
import { NetworkService } from './network.service'

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notes: Note[] = [];
  public loaded: boolean = false;

  constructor(private storage: StorageService, private network: NetworkService) {
  }

  load(hid: string): Promise<boolean> {

    // Return a promise so that we know when this operation has completed
    return new Promise((resolve) => {

      // Get the notes that were saved into storage
      this.network.get_notes(hid).subscribe((notes) => {
        // Only set this.notes to the returned value if there were values stored
        if(notes != null) {
          this.notes = notes;
        }
      // This allows us to check if the data has been loaded in or not
      resolve(true);
      });

    });

  }

  save(note: Note, hid: string): void {
    // Save the current array of notes to storage
    new Promise((resolve) => {
      this.network.edit_note(hid, note.id, note.content).subscribe((notes) => {
        resolve(true)
      });
    });
  }

  getNote(id): Note {
    // Return the note that has an id matching the id passed in
    return this.notes.find(note => note.id === id);
  }
  createNote(title: string, hid: string): void {

    this.notes.push({
      title: title,
      content: ''
    });

    let a = []
    a[0] = this.notes[this.notes.length - 1]
    new Promise((resolve) => {
      this.network.post_notes(hid, a).subscribe((notes) => {
        resolve(true);
      })
    })
  }

  deleteNote(id, hid: string): Promise<boolean> {

     return new Promise((resolve) => {
       this.network.delete_notes(hid, id).subscribe(Household => {})
       const index = this.notes.findIndex(object => {
         return object.id === id;
       })
      this.notes.splice(index, 1);
      resolve(true)  
     });
  }
}
