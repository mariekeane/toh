import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appointmentpage',
  templateUrl: './appointmentpage.component.html',
  styleUrls: ['./appointmentpage.component.css']
})

export class AppointmentpageComponent implements OnInit {
  heroes: Hero[];
  allappointments: Hero[];

  constructor(private heroService: HeroService) { };

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    // this.populateAllAppointments();
  }

  populateAllAppointments(): void {
    // for every hero in heroes
    for (let i = 0; i < this.heroes.length; i++) {
      // for every appointment in appointments
      for (let j = 0; j < this.heroes[i].appointments.length; j++) {
        // make a copy of the Hero  ...
        var tempHero = new Hero(this.heroes[i].id, this.heroes[i].name, this.heroes[i].skills, []);
        // push the particular appointment into it
        tempHero.appointments.push(this.heroes[i].appointments[j]);
        // and push it into allappointments
        this.allappointments.push(tempHero);
      }
    }
  }



} // end of AppointmentpageComponent

