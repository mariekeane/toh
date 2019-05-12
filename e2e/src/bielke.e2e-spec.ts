import { DashboardPage } from './pageObjects/dashboard.po';
import { browser, logging, ExpectedConditions } from 'protractor';

// Test Goal: Check title, count showcased heroes, check clearMessages button

describe('Test Bielke', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display title text', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Tour of Heroes');
  });

  // BROKEN , 0 notEqual 4, cannot find by css selector clearButton
  it('should have four hero names displayed', async () => {
    expect(await page.getTopHeroes().count()).toEqual(4);
  });

  it('should have a functional clear Messages button', async () => {
    await page.navigateTo();
    // should not be empty on loading, make sure of that
    expect(await page.getMessageContent(0)).toEqual('HeroService: fetched heroes');
    // get the clear button and click it
    await page.clickMessageClearButton();
    // make sure its empty
    expect(await page.getMessages().count()).toEqual(0);
  });
  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

}); // end of Description
