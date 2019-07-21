import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  readonly heroesUrl = 'http://localhost:4000/heroes';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes'))
      );
  }
  
  /** GET hero by id. Will 404 if id not found */
  getHero(_id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${_id}`;
    return this.http.get<Hero>(url).
      pipe(
        tap(_ => this.log(`fetched hero id=${_id}`)),
        catchError(this.handleError<Hero>(`getHero id=${_id}`))
      );
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };

  }
  
  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero._id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  
  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero._id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  
  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const _id = typeof hero === 'number' ? hero : hero._id;
    const url = `${this.heroesUrl}/${_id}`;
  
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${_id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes'))
    );
  }

  /* GET Skills */
  searchSkills(term: string): Observable<Hero[]> {

    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }


    return this.http.get<Hero[]>(`${this.heroesUrl}/?skills=${term}`).pipe(
      tap(_ => this.log(`found skills matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchSkills'))
    );
  }

}
