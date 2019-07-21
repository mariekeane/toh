import { Appointment } from './appointment';

export class Hero {
  _id: string;
  name: string;
  skills: string[] = [];
  appointments: Appointment[] = [];


  constructor(idString: string, nick: string, skillist: string[] = [], datelist: Appointment[] = []) {
    this._id = idString;
    this.name = nick;
    this.skills = skillist;
    this.appointments = datelist;
  }

}



