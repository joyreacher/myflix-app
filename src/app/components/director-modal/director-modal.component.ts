import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData {
  genre: any
  director: any
}
@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss']
})
export class DirectorModalComponent implements OnInit {
  birth: any
  death:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.birth = new Date(this.data.director.Birth)
    this.death = new Date(this.data.director.Death)
    
    this.birth = this.birth.getFullYear()
    this.death = this.death.getFullYear()
  }

}
