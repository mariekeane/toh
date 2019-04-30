import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let originalHero: Hero;

  beforeEach(async(() => {

    const heroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']); //create spy fake service
    originalHero = { id: 1, name: 'MyHero' } as Hero; //fill with data
    heroService.getHero.and.returnValue(of(originalHero)); //force return



    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: heroService } //shove the spy into the whole thing
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('h2 should look right', () => {
    let getHeroSpy = fixture.debugElement.injector.get(HeroService).getHero as jasmine.Spy;
    let name = fixture.nativeElement.querySelector('h2').textContent;
    expect(name).toEqual(component.hero.name.toUpperCase() + " Details");
  });

});
