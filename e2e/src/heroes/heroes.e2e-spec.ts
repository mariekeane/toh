import { HeroesPage } from './heroes.po';
import { browser, logging } from 'protractor';

describe('Heroes Page', () => {
  let heroPage: HeroesPage;

  beforeEach(async () => {
    heroPage = new HeroesPage();
    await heroPage.navigateTo();
  });

  it('should display proper title', async () => {
    expect(await heroPage.getTitleText()).toEqual('My Heroes');
  });
  
  it('should display all heroes', async () => {
    expect(await heroPage.getHeroes().count()).toEqual(10);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
