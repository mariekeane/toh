import { Appointment } from './appointment';

export class Hero {
  id: string;
  name: string;
  skills: string[] = [];
  appointments: Appointment[] = [];


  constructor(num: string, nick: string, skillist: string[] = [], datelist: Appointment[] = []) {
    this.id = num;
    this.name = nick;
    this.skills = skillist;
    this.appointments = datelist;
  }

}



