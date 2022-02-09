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
  /** ## Movie data */
  movie: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.movies()
  }
  /**
   * ## Store movie data that is _passed_ down from MovieCard
   */
  movies():any{
    this.movie = this.data.movie
  }
}
