import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs'
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HttpClientModule } from '@angular/common/http';



describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let router: Router;

  let expectedHeroes: Hero[];
  let heroToAdd: Hero;
  let heroToDelete: Hero;

  let getHeroesSpy: jasmine.Spy;
  let addHeroSpy: jasmine.Spy;
  let deleteHeroSpy: jasmine.Spy;

  beforeEach(async(() => {
    expectedHeroes = [
      { _id: '1', name: 'A' },
      { _id: '2', name: 'B' },
      { _id: '3', name: 'C' },
      { _id: '4', name: 'D' },
      { _id: '5', name: 'E' },
    ] as Hero[];

    heroToAdd = { _id: '6', name: 'F' } as Hero;
    heroToDelete = expectedHeroes[2];

    // Create a fake HeroService object with a `getHeroes()` spy
    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);
    heroService.getHeroes.and.returnValue(of(expectedHeroes));
    heroService.addHero.and.returnValue(of(heroToAdd));
    heroService.deleteHero.and.returnValue(of(heroToDelete));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        //? HttpClientModule
      ],
      declarations: [HeroesComponent],
      providers: [
        { provide: HeroService, useValue: heroService },
        //{ provide: Router,      useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();

    getHeroesSpy = fixture.debugElement.injector.get(HeroService).getHeroes as jasmine.Spy;
    addHeroSpy = fixture.debugElement.injector.get(HeroService).addHero as jasmine.Spy;
    deleteHeroSpy = fixture.debugElement.injector.get(HeroService).deleteHero as jasmine.Spy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all heroes', () => {
    expect(component.heroes).toEqual(expectedHeroes);
    expect(getHeroesSpy.calls.any()).toBe(true, 'getHeroes called');
  });

  it('should add a hero when user clicks add', () => {
    /* Arrange */
    let newHeroes: Hero[] = expectedHeroes;
    newHeroes.push(heroToAdd);

    const nameInputElement: HTMLInputElement = fixture.debugElement.query(By.css('#heroName')).nativeElement;
    const addButton: HTMLButtonElement = fixture.debugElement.query(By.css('#addHero')).nativeElement;

    /* Act */
    // Simulate user typing new hero name
    nameInputElement.value = heroToAdd.name;
    nameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Simulate user clicking "Add" button
    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    /* Assert */
    // Check component property values
    expect(component.heroes).toEqual(newHeroes);
    expect(addHeroSpy.calls.any()).toBe(true, 'addHero called');
    // Check template display
    const heroListItems: DebugElement[] = fixture.debugElement.queryAll(By.css('.hero'));
    expect(heroListItems.length).toEqual(newHeroes.length);
  });

  it('should not add heroes without names', () => {
    /* Arrange */
    const addButton: HTMLButtonElement = fixture.debugElement.query(By.css('#addHero')).nativeElement;

    /* Act */
    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    /* Assert */
    expect(component.heroes).toEqual(expectedHeroes);
    expect(addHeroSpy.calls.any()).toBe(false, 'addHero not called');
    const heroListItems: DebugElement[] = fixture.debugElement.queryAll(By.css('.hero'));
    expect(heroListItems.length).toEqual(expectedHeroes.length);
  });

  it('should delete apppropriate hero when user clicks delete', () => {
    /* Arrange */
    let newHeroes: Hero[] = expectedHeroes;
    newHeroes.splice(2, 1); // delete 3rd element

    /* Act */
    // Simulate user deleting 3rd hero
    const heroListItemElement: HTMLElement = fixture.debugElement.queryAll(By.css('.hero'))[2].nativeElement;
    const deleteButton = heroListItemElement.lastElementChild;
    deleteButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    /* Assert */
    // Check component property values
    expect(component.heroes).toEqual(newHeroes);
    expect(deleteHeroSpy.calls.any()).toBe(true, 'getHeroes called');
    // Check template display
    const heroListItems: DebugElement[] = fixture.debugElement.queryAll(By.css('.hero'));
    expect(heroListItems.length).toEqual(newHeroes.length);
  });

  it('should assign appropriate routerLinks to each hero element', () => {
    const heroListItemElement: HTMLElement = fixture.debugElement.queryAll(By.css('.hero'))[2].nativeElement;
    const heroLink = heroListItemElement.firstElementChild;
    const href = heroLink.getAttribute('href');
    //spyOn(router, 'navigateByUrl');

    //heroLink.dispatchEvent(new Event('click'));
    //fixture.detectChanges();

    expect(href).toEqual('/detail/' + expectedHeroes[2]._id);
    //expect(router.navigateByUrl).toHaveBeenCalledWith(['/detail/' + expectedHeroes[2].id]);
  });

});
