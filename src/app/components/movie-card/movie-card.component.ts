import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
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
  
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ])
  constructor(
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

}
