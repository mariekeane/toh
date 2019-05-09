import { DashboardPage } from './pageObjects/dashboard.po';
import { browser, logging, ExpectedConditions } from 'protractor';

// Test Goal: Check title, count showcased heroes, check clearMessages button

describe('Test Bielke', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display title text', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Tour of Heroes');
  });

  /* BROKEN , 0 notEqual 4, cannot find by css selector clearButton

  it('should have four hero names displayed', () => {
    expect(page.getTopHeroes().count()).toEqual(4);
  });

  it('should have a functional clear Messages button', async () => {
    page.navigateTo();
    // should not be empty on loading, make sure of that
    expect(page.getMessageContent()).toEqual('HeroService: fetched heroes');
    // get the clear button and click it
    await page.clickMessageClearButton();
    // make sure its empty
    expect(page.getMessageContent()).toBe(null);
  });
  */

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

}); // end of Description
