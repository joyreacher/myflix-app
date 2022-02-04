import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';

import { MatDialog } from '@angular/material/dialog';
import { GenreModalComponent } from '../genre-modal/genre-modal.component';
import { DirectorModalComponent } from '../director-modal/director-modal.component';
import { SynopsisModalComponent } from '../synopsis-modal/synopsis-modal.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  destroyed = new Subject<void>()
  currentScreenSize: string
  movies: any = []
  showSpinner = false
  breakpoint:number
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ])
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for(const query of Object.keys(result.breakpoints)){
          if(result.breakpoints[query]){
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown'
            console.log(this.currentScreenSize)
            this.onResize(this.currentScreenSize)
          }
        }
      })
  }

  ngOnInit(): void {
    this.getMovies()
  }
  
  getMovies(): void {
    this.showSpinner = true
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.showSpinner = false
      this.movies = response
      return this.movies
    })
  }
  
  onResize(currentScreenSize: string): any{
    console.log(currentScreenSize)
    switch(currentScreenSize){
      case 'XSmall':
        this.breakpoint = 1
        break
      case 'Small':
        this.breakpoint = 2
        break
      case 'Medium':
        this.breakpoint = 2
        break
      case 'Large':
        this.breakpoint = 3
        break
      case 'XLarge':
        this.breakpoint = 4
        break
    }
  }

  openGenreDialog(genre:any):any{
    this.dialog.open(GenreModalComponent, {
      data:{
        "genre":genre
      },
      width:'400px',
    })
  }

  openDirectorDialog(director:any):any{
    this.dialog.open(DirectorModalComponent, {
      data: {
        "director": director
      },
      width: '400px'
    })
  }

  openSynopsisDialog(movieTitle:any, movieDesc:any, movieDirector:any):any{
    this.dialog.open(SynopsisModalComponent, {
      data: {
        "movie": {
          title: movieTitle,
          description: movieDesc,
          director: movieDirector
        }
      },
      width: '400px'
    })
  }
  
  handleFavorites(title: string): any{
    let username = localStorage.getItem('user')
    // console.log(username, title)
    const data = {
      Username: username,
      Title: title
    }
    this.fetchApiData.addFavoriteMovie(data).subscribe((response) =>{
      console.log(response)
    })
  }
}
