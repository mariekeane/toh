export class Appointment {
  date: Date;
  location: string;

  constructor(when: Date, where: string) {
    this.date = when;
    this.location = where;
  }
}
