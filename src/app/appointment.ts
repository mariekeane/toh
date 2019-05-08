export class Appointment {
  date: Date;
  location: string;

  constructor(when: Date, where: string) {
    this.date = new Date(when);
    this.location = where;
  }
}
