import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData {
  movie: any
}
@Component({
  selector: 'app-synopsis-modal',
  templateUrl: './synopsis-modal.component.html',
  styleUrls: ['./synopsis-modal.component.scss']
})
export class SynopsisModalComponent implements OnInit {
  movie: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.movies()
  }
  movies():any{
    this.movie = this.data.movie
    console.log(this.movie.title)
  }
}
