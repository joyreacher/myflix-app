import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError  } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://cinema-barn.herokuapp.com'
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }
  
  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('An error has occurred : ', error.error.message)
    }else{
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      )
      return throwError(
        'Something went wrong'
      )
    }
  }
  
}
