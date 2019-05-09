import { HeroesPage } from './pageObjects/heroes.po';
import { browser, logging } from 'protractor';

// Test Goal: Go to Heroes page, creates and destroys Hero

describe('Test Chava', () => {
  let page: HeroesPage;

  beforeEach(async () => {
    page = new HeroesPage();
    await page.navigateTo();
  });

  it('should display proper title', async () => {
    // verify it says My Heroes
    expect(await page.getTitleText()).toEqual('My Heroes');
  });

  // Create, Save, and Destroy a Hero
  it('should create and destroy heroes from Heroes page', async () => {
    

  });
  // put something into input


  // click on Add to create the Hero, it'll refresh the hero
  // find the link that has the hero name
  // click on the hero link
  // click on save, it'll go back to heroes
  // maneuver away, maneuver back
  // find the button that destroys the hero
  // click it
  // verify the hero cannot be found




  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

}); // end of Description
