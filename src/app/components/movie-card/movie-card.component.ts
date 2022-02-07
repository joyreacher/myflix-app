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
  /** ## currentScreenSize used to indicate the screen size as returned from {@link breakpointObserver} */
  currentScreenSize: string
  /**## movies are what is displayed in the main view */
  movies: any = []
  /** ## spinner init */
  showSpinner = false
  /** ## breakpoint variable used in {@link MovieCardComponent} HTML template to specify cols in grid-list*/
  breakpoint:number
  /** ## user holds logged in user information */
  user:any
  /** ## map each breakpoint to string value*/
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ])
  /**
   * ## Main
   * @param dialog 
   * @param fetchApiData 
   * @param breakpointObserver 
   * @param snackbar 
   */
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
            this.onResize(this.currentScreenSize)
          }
        }
      })
  }

  ngOnInit(): void {
    this.getMovies()
  }
  /**
   * ## Get Movies 
   * @description Uses the {@link FetchApiDataService} to call for all movies
   * to store in the {@link movies} array
   */
  getMovies(): void {
    this.showSpinner = true
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.showSpinner = false
      this.movies = response
      this.getUser()
      return this.movies
    })
  }
  /**
   * ## Get User Data
   * @description Uses the {@link FetchApiDataService} to call for User object
   * to store in the local {@link user} object
   */
  getUser(): void{
    this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((user) =>{
      this.user = user
      this.checkFavoriteMovies()
    })
  }
  /**
   * ## Find users favorite movies
   * @description Iterate through {@link movies} and {@link user.favorite_movies} arrays
   * to compare ```_id``` 
   * If true the movie object will be given a ```Favorite``` key with the value of true.
   * @returns 
   */
  checkFavoriteMovies():object{
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
    return this.movies
  }
  /**
   * ## Check for which breakpoint to use
   * @description Function that runs when the viewport has changed
   * @param currentScreenSize is mapped from {@link breakpointObserver}
   * @return 
   */
  onResize(currentScreenSize: string): any{
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
  /**
   * ## Showing the genre dialog
   * @description Triggers the MatDialog to open and display {@link GenreModalComponent}
   * The ```data``` argument passes data to the {@link GenreModalComponent} to display values
   * @example
   *```
   *  data:{
    * "genre": genre
   * }
   *```
   * @param genre 
   * 
   */
  openGenreDialog(genre:string):any{
    this.dialog.open(GenreModalComponent, {
      data:{
        "genre":genre
      },
      width:'400px',
    })
  }
  /**
   * ## View director information in dialog
   * @description Pass in the director object to display director values in the {@link DirectorModalComponent}
   * @param director 
   */
  openDirectorDialog(director:object):any{
    this.dialog.open(DirectorModalComponent, {
      data: {
        "director": director
      },
      width: '400px'
    })
  }
  /**
   * ## View general movie info
   * @description Trigger the Matdialog to view general movie info
   * @param movieTitle 
   * @param movieDesc 
   * @param movieDirector 
   */
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
  /**
   * ## Favorite movie toggle
   * @description Takes the title of movie and username to either add or remove movie from favorites
   * The event is used to find the ```textContent``` of the button when its pressed
   * 
   * @param title 
   * @param event 
   * @returns data object to pass into {@link addMovie} or {@link removeMovie}
   */
  handleFavorites(title: string, event:any): any{
    let username = localStorage.getItem('user')
    const data = {
      Username: username,
      Title: title
    }
    if(event.target.textContent.includes('_border')){
      event.target.textContent = 'favorite_fill'
      return this.addMovie(data)
    }
    if(event.target.textContent.includes('_fill')){
      event.target.textContent = 'favorite_border'
      return this.removeMovie(data)
    }
  }
  /**
   * ## Add a movie using favorites icon
   * @description Add a movie to a user's favorites
   * @example
   *```
   *  data:{
    * "Username": username,
    * "Title": movie-title
   * }
   *```
   * @param data 
   */
  addMovie(data:any):any{
    this.fetchApiData.addFavoriteMovie(data).subscribe((response) =>{
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
  /**
   * ## Remove a movie from favorites
   * @description Remove movie form a users favorites array
   * @param data 
   */
  removeMovie(data:any):any{
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
