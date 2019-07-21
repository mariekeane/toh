import { RouterTestingModule } from '@angular/router/testing';
import { HeroSearchComponent } from './hero-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, tick, discardPeriodicTasks, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import 'zone.js/dist/zone-patch-rxjs-fake-async';
import { By } from '@angular/platform-browser';
import { Observable, of, interval } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HttpClientModule } from '@angular/common/http';




describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  const DEBOUNCING_VALUE = 300;
  const expectedHeroes: Hero[] = [
    { _id: '1', name: 'A' },
    { _id: '2', name: 'Aa' },
    { _id: '3', name: 'Aaa' },
    { _id: '4', name: 'Aaaa' },
    { _id: '5', name: 'Aaaaa' },
  ] as Hero[];
  let results: Hero[];

  let getHeroesSpy: jasmine.Spy;
  let searchHeroesSpy: jasmine.Spy;

  let searchInputElement: HTMLInputElement;

  beforeEach(async(() => {
    // Create Spy for HeroService
    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'searchHeroes']);
    heroService.getHeroes.and.returnValue(of(expectedHeroes));
    heroService.searchHeroes.and.callFake((term) => {
      if (!term.trim()) { return of([]); }
      return of(expectedHeroes.filter((el) => el.name.toLowerCase().includes(term.toLowerCase())))
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [HeroSearchComponent],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    getHeroesSpy = fixture.debugElement.injector.get(HeroService).getHeroes as jasmine.Spy;
    searchHeroesSpy = fixture.debugElement.injector.get(HeroService).searchHeroes as jasmine.Spy;

    searchInputElement = fixture.debugElement.query(By.css('#search-box')).nativeElement;

    results = null;
    component.heroes$.subscribe((data) => {
      results = data;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display results as user enters input', fakeAsync(() => {
    /* Arrange */
    const searchTerm: string = 'aaa';
    const expectedResults: Hero[] = [
      { _id: '3', name: 'Aaa' },
      { _id: '4', name: 'Aaaa' },
      { _id: '5', name: 'Aaaaa' },
    ] as Hero[];
    let searchResultElements: DebugElement[];

    /* Act */
    searchInputElement.value = searchTerm;
    searchInputElement.dispatchEvent(new Event('input'));
    tick(DEBOUNCING_VALUE);
    fixture.detectChanges();

    /* Assert */
    expect(searchHeroesSpy.calls.any()).toEqual(true);
    expect(results).toEqual(expectedResults);
    searchResultElements = fixture.debugElement.queryAll(By.css('.hero-search-result'));
    expect(searchResultElements.length).toEqual(3);
  }));

  it('should update every 300ms', fakeAsync(() => {
    /* Arrange */
    const searchTerm: string = 'aaa';
    const expectedResults: Hero[] = [
      { _id: '3', name: 'Aaa' },
      { _id: '4', name: 'Aaaa' },
      { _id: '5', name: 'Aaaaa' },
    ] as Hero[];
    let searchResultElements: DebugElement[];

    /* Act */
    searchInputElement.value = searchTerm;
    searchInputElement.dispatchEvent(new Event('input'));
    tick(DEBOUNCING_VALUE);
    searchInputElement.value = 'aaaaa';
    searchInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    /* Assert */
    expect(results).toEqual(expectedResults);
    searchResultElements = fixture.debugElement.queryAll(By.css('.hero-search-result'));
    expect(searchResultElements.length).toEqual(expectedResults.length);

    /* Act */
    //discardPeriodicTasks();
    tick(DEBOUNCING_VALUE);
    fixture.detectChanges();

    /* Assert */
    expect(results).toEqual([{ _id: '5', name: 'Aaaaa' }] as Hero[]);
    searchResultElements = fixture.debugElement.queryAll(By.css('.hero-search-result'));
    expect(searchResultElements.length).toEqual(1);
  }));
});
