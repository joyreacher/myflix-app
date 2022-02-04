import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError  } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://cinema-barn.herokuapp.com/'
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
      if(!error.error.errors){
        return throwError(
          error.error
        )
      }else{
        return throwError(
          error.error.errors[0].msg
        )
      }
      
    }
  }
  /**
   * 
   * @param userDetails 
   * @returns 
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users/', userDetails)
      .pipe(catchError(this.handleError))
  }
  /**
   * 
   * @param userDetails 
   * @returns 
   */
  public userLogin(userDetails: any): Observable<any>{
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError))
  }
  
  /**
   * @function getAllMovies
   * @returns 
   */
  public getAllMovies(): Observable<any> {
    return this.http
    .get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
      )})
    .pipe(catchError(this.handleError));
  }
  
  /**
   * 
   * @param movieTitle 
   * @returns 
   */
  public getOneMovie(movieTitle: any): Observable<any>{
    return this.http.get(apiUrl + 'movies', movieTitle).pipe(
      catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param directorName 
   * @returns 
   */
  public getDirector(directorName: any): Observable<any>{
    return this.http.get(apiUrl + 'directors', directorName).pipe(
      catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param genreName \
   * @returns 
   */
  public getGenre(genreName: any): Observable<any>{
    return this.http
      .get(apiUrl + '/genre/', genreName)
      .pipe(catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param userName 
   * @returns 
   */
  public getUser(userName: any): Observable<any>{
    return this.http
      .get(apiUrl + 'user/'+ userName, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
        )})
      .pipe(catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param userName
   * @returns 
   */
  public getFavoriteMovies(userName: any): Observable<any>{
    return this.http.get(apiUrl + 'user', userName).pipe(
      // user/[username] pulls user object
      catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param userName 
   * @param movieData 
   * @returns 
   */
  public addFavoriteMovie(data: any): Observable<any>{
    return this.http
      .post(apiUrl + 'users/mymovies/add', data, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
        )})
      .pipe(catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param user
   * @returns 
   */
  public editUser(user: any): Observable<any>{
    return this.http
    .put(apiUrl + 'users/' + localStorage.getItem('user'), {
      Username:user.userName,
      Password: user.password,
      Email: user.email,
      Birthday:user.birthday
      }, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
        )})
    .pipe(
      catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param userName 
   * @returns 
   */
  public deleteUser(user: any): Observable<any>{
    return this.http.post(apiUrl + 'users/unregister', user, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
      )}).pipe(
      catchError(this.handleError)
    )
  }
  
  /**
   * 
   * @param userName 
   * @param movieTitle 
   * @returns 
   */
  public deleteFavoriteMovie(userName: any, movieTitle: any): Observable<any>{
    return this.http.post(apiUrl + 'movies/mymovies/delete', userName, movieTitle).pipe(
      catchError(this.handleError)
    )
  }
}
