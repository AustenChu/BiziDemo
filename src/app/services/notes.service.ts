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

  load(): Promise<boolean> {

    // Return a promise so that we know when this operation has completed
    return new Promise((resolve) => {

      // Get the notes that were saved into storage
      this.network.get_notes('7c56334f-b8ac-4aab-83fd-9375715c6ae6').subscribe((notes) => {
        // Only set this.notes to the returned value if there were values stored
        if(notes != null) {
          this.notes = notes;
        }
      // This allows us to check if the data has been loaded in or not
      resolve(true);
      });

    });

  }

  save(): void {
    // Save the current array of notes to storage
    this.storage.setData('notes', this.notes);
  }

  getNote(id): Note {
    // Return the note that has an id matching the id passed in
    return this.notes.find(note => note.id === id);
  }
  createNote(title: string): void {

    // Create a unique id that is one larger than the current largest id
    let id = 3

    this.notes.push({
      title: title,
      content: ''
    });


    let a = []
    a[0] = this.notes[this.notes.length - 1]
    new Promise((resolve) => {
      this.network.post_notes('7c56334f-b8ac-4aab-83fd-9375715c6ae6', a).subscribe((notes) => {
        resolve(true);
      })
    })
  }

  deleteNote(id): Promise<boolean> {

     return new Promise((resolve) => {
       this.network.delete_notes('7c56334f-b8ac-4aab-83fd-9375715c6ae6', id).subscribe(Household => {})
       const index = this.notes.findIndex(object => {
         return object.id === id;
       })
      this.notes.splice(index, 1);
      resolve(true)  
     });
  }
}
