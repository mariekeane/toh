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
  allappointments: Hero[] = [];

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
  }

  UpdateAllAppointments(): void {
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
    // sort by date
    this.allappointments = this.allappointments.sort(
      (a: Hero, b: Hero) => {
      if (a.appointments[0].date < b.appointments[0].date) { return -1; }
      if (a.appointments[0].date > b.appointments[0].date) { return 1; }
      return 0;
    });

  } // end of UpdateAllAppointments
} // end of AppointmentpageComponent

