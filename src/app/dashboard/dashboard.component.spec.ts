import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs'
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let getHeroesSpy;
  let expectedHeroes: Hero[];

  beforeEach(async(() => {
    expectedHeroes = [
      { id: 1, name: 'A', skills: [], appointments: [] },
      { id: 2, name: 'B', skills: [], appointments: [] }
    ] as Hero[];

    // Create a fake HeroService object with a `getHeroes()` spy
    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    heroService.getHeroes.and.returnValue(of(expectedHeroes));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getHeroesSpy = fixture.debugElement.injector.get(HeroService).getHeroes as jasmine.Spy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get expected heroes', () => {
    expect(component.heroes).toEqual(expectedHeroes.slice(1, 5), 'should return expected heroes');
    expect(getHeroesSpy.calls.any()).toBe(true, 'getHeroes called');
  });

});


  // 
  /*it('should get expected heroes (async)', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        // after something in the component changes, you should detect changes
        fixture.detectChanges();
        expect(component.heroes).toEqual(expectedHeroes.slice(1, 5), 'should return expected heroes');
        expect(getHeroesSpy.calls.any).toBe(true, 'getHeroes called');
    })
  }));*/
