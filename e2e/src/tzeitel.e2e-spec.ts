import { DashboardPage } from './pageObjects/dashboard.po';
import { browser, logging } from 'protractor';

// Test Goal: asdf

describe('Test Tzeitel', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  // Tests Go Here

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

}); // end of Description
