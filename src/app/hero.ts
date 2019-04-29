import { Appointment } from './appointment';

export class Hero {
  id: number;
  name: string;
  skills: string[] = [];
  appointments: Appointment[] = [];


  constructor(num: number, nick: string, skillist: string[], datelist: Appointment[]) {
    this.id = num;
    this.name = nick;
    this.skills = skillist;
    this.appointments = datelist;
  }

}



