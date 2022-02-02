import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  getUser(): any{
    if(!localStorage.getItem('token')){
      this.router.navigate(['welcome'])
    }
    return localStorage.getItem('user');
  }
}
