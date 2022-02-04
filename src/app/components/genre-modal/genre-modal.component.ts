import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData {
  genre: any
  director: any
}
@Component({
  selector: 'app-genre-modal',
  templateUrl: './genre-modal.component.html',
  styleUrls: ['./genre-modal.component.scss']
})
export class GenreModalComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }
  
  ngOnInit(): void {
    this.movies()
  }

  movies(){
    console.log(this.data.director)
  }
}
