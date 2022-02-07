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
   * ## Registering a user
   * @description All fields are required 
   * ```
   * userDetails:{
      *Username: data.userName, 
      *Password: data.password,
      *Email: data.email, 
      *Birthday: data.birthday, 
    *}
   *```
   * @param userDetails 
   * @returns 
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users/', userDetails)
      .pipe(catchError(this.handleError))
  }
  /**
   * ## Login
   * @description ```userDetails``` contain ```Username``` and ```Password``` values
   * @param userDetails 
   * @returns 
   */
  public userLogin(userDetails: any): Observable<any>{
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError))
  }
  
  /**
   * ## Get all movies 
   * @description Return all movies available from API
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
   * ## Get single movie
   * @description Returns a single movie resource by passing in a title
   * @param movieTitle 
   * @returns 
   */
  public getOneMovie(movieTitle: any): Observable<any>{
    return this.http.get(apiUrl + 'movies', movieTitle).pipe(
      catchError(this.handleError)
    )
  }
  
  /**
   * ## Get Director information
   * @description Takes a directors name to return ```Name, Bio, Birth, Death```
   * @param directorName 
   * @returns 
   */
  public getDirector(directorName: any): Observable<any>{
    return this.http.get(apiUrl + 'directors', directorName).pipe(
      catchError(this.handleError)
    )
  }
  
  /**
   * ## Returns movies in a specific genre
   * @description Pass in a genre name to return array of movies
   * @param genreName
   * @returns 
   */
  public getGenre(genreName: any): Observable<any>{
    return this.http
      .get(apiUrl + '/genre/', genreName)
      .pipe(catchError(this.handleError)
    )
  }
  
  /**
   * ## Get User
   * @description Takes a username and returns user object
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
   * ## Get a user's favorite movies
   * @description Returns the user object containing favorite_movies array
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
   * ## Add a favorite movie to a user
   * @description Adds a movie resource to a specific user
   * ```
   * data:{
      *Username: data.userName, 
      *Title: data.Title,
    *}
   *```
   * @param data 
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
   * ## Make Changes to user profile
   * * {@link editUser}
   * @description Pass an object containing key value pairs for ```Username, Password, Email, Birthday```
   * ```
   * user:{
      *Username: user.userName, 
      *Password: user.Password,
      *Email: user.Email,
      *Birthday: user.birthday
    *}
   *```
   * @typeParam user is an object
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
   * ## Deleting a user
   * @description deleteUser takes a single object containing Username and Email key value pairs
   * 
   * ```
   * user:{
      *Username: user.userName, 
      *Email: user.Email,
    *}
   *```
   * @param user.Username:string
   * @param user.Email:string
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
   * ## Delete a user's favorite movie
   * @description Removes a movie resource from a users favorite_movies array
   * @param userName
   * @param movieTitle
   * @returns 
   */
  public deleteFavoriteMovie(userName: any, movieTitle: any): Observable<any>{
    return this.http.post(apiUrl + 'users/mymovies/delete', {Username:userName,Title: movieTitle}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
      )}).pipe(
      catchError(this.handleError)
    )
  }
}
