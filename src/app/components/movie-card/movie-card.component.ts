import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
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
  favorite:boolean
  user:any
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
    public breakpointObserver: BreakpointObserver,
    public snackbar: MatSnackBar,
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
      this.getUser()
      return this.movies
    })
  }

  getUser(): void{
    this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((user) =>{
      this.user = user
      this.checkFavoriteMovies()
    })
  }

  checkFavoriteMovies():any{
    this.movies = this.movies.map((movie:any) =>{
      this.user.favorite_movies.forEach((fav:any) => {
        if(fav._id !== movie._id){
          return movie
        }else{
          movie.Favorite = true
        }
      })
      return movie
    })
    // console.log(this.movies)
    return this.movies
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

  handleFavorites(title: string, event:any): any{
    let username = localStorage.getItem('user')
    const data = {
      Username: username,
      Title: title
    }
    if(event.target.textContent === ' favorite_border '){
      event.target.textContent = 'favorite_fill'
      return this.addMovie(data)
    }
    if(event.target.textContent.includes('_fill')){
      event.target.textContent = 'favorite_border'
      return this.removeMovie(data)
    }
  }

  addMovie(data:any):any{
    this.fetchApiData.addFavoriteMovie(data).subscribe((response) =>{
      console.log(response)
      this.favorite = true
      this.snackbar.open(
        'Added to your favorites',
        "OK", {
          duration: 2000
        }
      )
    }, (error) => {
      console.log(error)
      this.snackbar.open(
        'Could not add to your favotires',
        "OK", {
          duration: 2000
        }
      )
    })
  }

  removeMovie(data:any):any{
    console.log(data)
    this.fetchApiData.deleteFavoriteMovie(data.Username, data.Title).subscribe((response)=>{
      window.location.reload()
      this.snackbar.open(
        `${data.Title} was removed from your favorites`,
        "OK", {
          duration: 2000
        }
      )
    }, (error) =>{
      this.snackbar.open(
        `${data.Title} was removed`,
        "OK", {
          duration: 2000
        }
      )
    })
  }
}
