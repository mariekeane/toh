import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { of } from 'rxjs'

import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  
  let expectedHeroes: Hero[];
  
  let getHeroesSpy: jasmine.Spy;

  beforeEach(async(() => {
    expectedHeroes = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
       ] as Hero[];

    // Create a fake HeroService object with a `getHeroes()` spy
    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    heroService.getHeroes.and.returnValue( of(expectedHeroes) );
    
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ HeroesComponent ],
      providers:    [
        { provide: HeroService, useValue: heroService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    getHeroesSpy = fixture.debugElement.injector.get(HeroService).getHeroes as jasmine.Spy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
