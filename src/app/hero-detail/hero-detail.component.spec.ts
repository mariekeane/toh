import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { of } from 'rxjs'

import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let router: Router;
  
  let getHeroSpy: jasmine.Spy;
  let updateHeroSpy: jasmine.Spy;
  let backSpy: jasmine.Spy;
  
  let originalHero: Hero;
  let updatedHero: Hero;
  
  let title: HTMLElement;
  let nameInput: HTMLInputElement;

  beforeEach(async(() => {
    originalHero = { _id: 'abc123', name: 'MyHero' } as Hero;
    updatedHero = { _id: 'abc123', name: 'MyHeroUpdated' } as Hero;
    
    // Create a fake HeroService object with `getHero()` and `updatehero()` spies
    const heroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    heroService.getHero.and.returnValue( of(originalHero) );
    heroService.updateHero.and.returnValue( of(updatedHero) );
    
    // Create a fake Location object with a `back()` spy
    const location = jasmine.createSpyObj("Location", ["back"]);
    
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ HeroDetailComponent ],
      providers:    [
        { provide: HeroService, useValue: heroService },
        { provide: Location, useValue: location }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router)
    fixture.detectChanges();
    
    getHeroSpy = fixture.debugElement.injector.get(HeroService).getHero as jasmine.Spy;
    updateHeroSpy = fixture.debugElement.injector.get(HeroService).updateHero as jasmine.Spy;
    backSpy = fixture.debugElement.injector.get(Location).back as jasmine.Spy;
    
    title = fixture.nativeElement.querySelector('h2');
    nameInput = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display name of hero', () => {
    expect(getHeroSpy.calls.any()).toBe(true, 'getHero called');
    expect(title.textContent).toBe(originalHero.name.toUpperCase() + ' Details');
  });
  
  it('should display nothing if hero is undefined', () => {
    component.hero = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#heroDetails')).toBeNull();
  });
  
  // NOTE: updateHero not called until user clicks "Save" -- not simulated here
  it('should update title when name changes', () => {
    // simulate user entering a new name into the input box
    nameInput.value = updatedHero.name;   
    // dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));   
    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();
   
    expect(title.textContent).toBe(updatedHero.name.toUpperCase() + ' Details');
  });
  
  it('should update hero on save', () => {
    nameInput.value = updatedHero.name;   
    nameInput.dispatchEvent(new Event('input'));   
    fixture.detectChanges();
    
    const saveButton = fixture.debugElement.query(By.css('#saveHero')).nativeElement;
    saveButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    expect(component.hero).toEqual(updatedHero);
    expect(updateHeroSpy.calls.any()).toBe(true, 'updateHero called');
  });
  
  it('should go back on save', () => {
    nameInput.value = updatedHero.name;   
    nameInput.dispatchEvent(new Event('input'));   
    fixture.detectChanges();
    
    const saveButton = fixture.debugElement.query(By.css('#saveHero')).nativeElement;
    saveButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    expect(backSpy).toHaveBeenCalledTimes(1);
  });
});
