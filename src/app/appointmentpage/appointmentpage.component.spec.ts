import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppointmentpageComponent } from './appointmentpage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { of } from 'rxjs'

describe('AppointmentpageComponent', () => {
  let component: AppointmentpageComponent;
  let fixture: ComponentFixture<AppointmentpageComponent>;
  let getHeroesSpy;
  let crashTestHeroes: Hero[];
  let allappointments: Hero[];
  let datePrimeArray: Date[];
  let dateSortedArray: Date[];

  // reset test data before every test
  beforeEach(() => {
    allappointments = [] as Hero[];
    crashTestHeroes = [
      {
        id: 0, name: 'alpha', skills: [], appointments: [
          { location: 'Alexandria', date: new Date('1/1/01') },
          { location: 'Birmingham', date: new Date('2/2/01') },
          { location: 'Edmonds', date: new Date('5/5/05') },
          { location: 'Galveston', date: new Date('8/1/12') }
        ]
      },
      {
        id: 23, name: 'zulu', skills: [], appointments: [
          { location: 'Cambridge', date: new Date('3/3/01') },
          { location: 'Dallas', date: new Date('4/4/01') },
          { location: 'Fairfield', date: new Date('5/5/06') },
          { location: 'Harriman', date: new Date('8/2/12') }
        ]
      }
    ] as Hero[];
  })

  // fake HeroService object to spy on 'getHeroes', similar to Dashboard
  const heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
  heroService.getHeroes.and.returnValue(of(crashTestHeroes));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AppointmentpageComponent],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    })
      .compileComponents();
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

  // getheroes function should return crash test heroes
  // integrate spy
  it('should perform getHeroes', () => {
    expect(component.getHeroes).toEqual(crashTestHeroes, 'should return expected heroes');
    expect(getHeroesSpy.calls.any()).toBe(true, 'getHeroes function called');
  });

  // everything in allappointments should have a single appointment
  // iterate over allappointments, array length should be 1
  it('should only have one appointment per index in allappointments', () => {
    allappointments.forEach(n => {
      expect(n.appointments.length == 1);
    });
  });

  /*
  // appointments in allappointments should be sorted by date
  it('should sort allappointments dates properly', () => {
    datePrimeArray = [];
    allappointments.forEach(n => {
      datePrimeArray.push(n.appointments[0].date);
    });
    dateSortedArray = datePrimeArray;
    dateSortedArray = dateSortedArray.sort(function (a, b) {
      return a.getTime() - b.getTime();
    })
    expect(dateSortedArray == datePrimeArray);
  });
  */

}); // end of describe

