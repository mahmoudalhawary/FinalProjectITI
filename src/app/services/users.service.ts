import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/product/product.module'; // Ensure the path is correct
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userApiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }

  // Fetch all users
  find(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.userApiUrl)
 
  }

  // Add a new user
  addUsers(user: Users): Observable<Users> {
 return this.httpClient.post<Users>(this.userApiUrl, user)
    // .pipe(
    //   catchError(this.handleError<Users>('addUsers')) // Handle errors
    // );
  }

  // Error handling method
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(`${operation} failed: ${error.message}`); // Log to console or send to a logging service
  //     return of(result as T); // Let the app keep running by returning an empty result
  //   };
  // }
}
