import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  route(page: string): any{
    return this.router.navigate([`${page}`])
  }

  signOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['welcome'])
  }

  isUserLoggedIn(): any{
    return localStorage.getItem('token');
  }
}
