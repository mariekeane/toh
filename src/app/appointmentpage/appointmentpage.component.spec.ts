import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppointmentpageComponent } from './appointmentpage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';

describe('AppointmentpageComponent', () => {
  let component: AppointmentpageComponent;
  let fixture: ComponentFixture<AppointmentpageComponent>;
  let getHeroesSpy;
  let crashTestHeroes: Hero[];
  let allappointments: Hero[];
  let datePrimeArray: Date[];
  let dateSortedArray: Date[];

  crashTestHeroes = [
    {
      _id: '0', name: 'alpha', skills: [], appointments: [
        { location: 'Alexandria', date: new Date('1/1/01') },
        { location: 'Birmingham', date: new Date('2/2/01') },
        { location: 'Edmonds', date: new Date('5/5/05') },
        { location: 'Galveston', date: new Date('8/1/12') }
      ]
    },
    {
      _id: '23', name: 'zulu', skills: [], appointments: [
        { location: 'Cambridge', date: new Date('3/3/01') },
        { location: 'Dallas', date: new Date('4/4/01') },
        { location: 'Fairfield', date: new Date('5/5/06') },
        { location: 'Harriman', date: new Date('8/1/12') }
      ]
    },
    {
      _id: '4', name: 'epsilon', skills: [], appointments: []
    },
    {
      _id: '5', name: 'foxtrot', skills: []
    }
  ] as Hero[];

  beforeEach(async(() => {
    // fake HeroService object to spy on 'getHeroes', similar to Dashboard
    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    heroService.getHeroes.and.returnValue(of(crashTestHeroes));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AppointmentpageComponent],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getHeroesSpy = fixture.debugElement.injector.get(HeroService).getHeroes as jasmine.Spy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // everything in allappointments should have a single appointment
  // iterate over allappointments, array length should be 1
  it('should only have one appointment per index in allappointments', () => {
      expect(component.allappointments.length).toEqual(8);
      component.allappointments.forEach(n => {
        expect(n.appointments.length).toEqual(1);
      });
  });

  // getheroes function should return crash test heroes  
  it('should verify getheroes was performed', async () => {

      expect(component.heroes).toEqual(crashTestHeroes);
      expect(getHeroesSpy.calls.any()).toBe(true);

  });
  

  








}); // end of describe
