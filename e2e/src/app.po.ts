import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo() {
    return await browser.get(browser.baseUrl);
  }

  async getTitleText() {
    return await element(by.css('app-root h1')).getText();
  }
  
  getAppDashboard() {
    return element(by.css('app-root app-dashboard'));
  }
}
