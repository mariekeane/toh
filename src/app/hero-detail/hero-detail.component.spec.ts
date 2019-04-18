import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs'

import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  
  let getHeroSpy: jasmine.Spy;
  let updateHeroSpy: jasmine.Spy;
  
  let originalHero: Hero;
  let updatedHero: Hero;
  
  let title: HTMLElement;
  let nameInput: HTMLInputElement;

  beforeEach(async(() => {
    originalHero = { id: 1, name: 'MyHero' } as Hero;
    updatedHero = { id: 1, name: 'MyHeroUpdated' } as Hero;
    
    // Create a fake HeroService object with a `getHeroes()` spy
    const heroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    // Make the spy return a synchronous Observable with the test data
    getHeroSpy = heroService.getHero.and.returnValue( of(originalHero) );
    updateHeroSpy = heroService.updateHero.and.returnValue( of(updatedHero) );
    
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ HeroDetailComponent ],
      providers:    [
        { provide: HeroService, useValue: heroService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    title = fixture.nativeElement.querySelector('h2');
    nameInput = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display name of hero', () => {
    expect(title.textContent).toBe(originalHero.name.toUpperCase() + ' Details');
  });
  
  it('should display nothing if hero is undefined', () => {
    component.hero = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#heroDetails')).toBeNull();
  });
  
  it('should update title when name changes', () => {
    // simulate user entering a new name into the input box
    nameInput.value = updatedHero.name;   
    // dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));   
    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();
   
    expect(title.textContent).toBe(updatedHero.name.toUpperCase() + ' Details');
  });
});
