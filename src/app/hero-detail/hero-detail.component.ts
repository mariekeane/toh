import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Appointment } from '../appointment';
import { HeroService }  from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  removeSkill(position: number): void {
    this.hero.skills.splice(position, 1);
  }

  addSkill(c: string = ''): void {
    this.hero.skills.push(c);
  }

  removeAppointment(position: number): void {
    this.hero.appointments.splice(position, 1);
  }

  addAppointment(a: Date, b: string): void {
    this.hero.appointments.push(new Appointment(a,b));
 }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
