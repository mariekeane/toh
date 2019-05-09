import { browser, by, promise, element } from 'protractor';

export class AppointmentPage {
  async navigateTo(): Promise<any> {
    return await browser.get(browser.baseUrl + 'appointments');
  }





} // end of AppointmentpagePage class

  /*
  <ul class="appointmentpage">
  <li *ngFor="let hero of allappointments">
    <a routerLink="/detail/{{hero.id}}">
      <span class="when">{{hero.appointments[0].date}}</span>
      <span class="where">{{hero.appointments[0].location}}</span>
      <span class="who">{{hero.name}}</span>
    </a>

  </li>
</ul>
  */
