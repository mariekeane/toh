import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})


export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  skills$: Observable<Hero[]>;

  private nameSearchTerms = new Subject<string>();
  private skillSearchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  nameSearch(term: string): void {
    this.nameSearchTerms.next(term);
  }

  skillSearch(term: string): void {
    this.skillSearchTerms.next(term);
  }

  ngOnInit(): void {
    // INIT the name search
    this.heroes$ = this.nameSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

    // INIT the skill search
    this.skills$ = this.skillSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchSkills(term)),
    );

  }
}
