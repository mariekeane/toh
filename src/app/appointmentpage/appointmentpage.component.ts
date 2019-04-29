import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-appointmentpage',
  templateUrl: './appointmentpage.component.html',
  styleUrls: ['./appointmentpage.component.css']
})

export class AppointmentpageComponent implements OnInit {
  heroes: Hero[] = [];
  allappointments: Hero[] = [{
    id: 127,
    name: 'The Dude',
    skills: [],
    appointments: [{
      date: new Date('11/10/2016,11:49:36AM'),
      location: 'Mayfield Heights'
    }]
    }];

  constructor(private heroService: HeroService) { };

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.UpdateAllAppointments();
      });
    
    // this.waitOnHeroes();
  }

  UpdateAllAppointments(): void {
    console.log('updateallappointments is being called');
    // for every hero in heroes ...
    this.heroes.forEach(a => {
      // for every appointment in appointments ...
      if (a.appointments) {
        a.appointments.forEach(b => {
          // push to allappointments an identical hero with just (b) appointment
          this.allappointments.push(new Hero(a.id, a.name, a.skills, [b]));
        });
      }
    });
    // sort allappointments based on date
    // this.allappointments.sort


    
  } // end of UpdateAllAppointments
} // end of AppointmentpageComponent

