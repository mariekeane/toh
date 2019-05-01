import { HeroDetailsPage } from './hero-detail.po';
import { HeroesPage } from '../heroes/heroes.po';
import { browser, logging, ExpectedConditions } from 'protractor';

describe('Hero Details Page', () => {
  let heroPage: HeroesPage;
  let heroDetailsPage: HeroDetailsPage;

  beforeEach(async () => {
    heroDetailsPage = new HeroDetailsPage();
    /*
     * Must navigate to hero detail page from heroes page
     * because "save" and "cancel" buttons use "location.back."
     * If there is nowhere to go "back" to, navigation fails.
     */
    heroPage = new HeroesPage();
    await heroPage.navigateTo();
    await heroPage.clickHero(0);
  });

  it('should display proper title', async () => {
    expect(await heroDetailsPage.getTitleText()).toEqual('MR. NICE Details');
  });
  
  describe('Update Hero', () => {
    
    beforeEach(async () => {
      await heroDetailsPage.updateNameInput('Cool Dude');
    });
  
    it('should update title when name is updated', async () => {
      expect(await heroDetailsPage.getTitleText()).toEqual('COOL DUDE Details');
    });
    
    it('should navigate to heroes page on save', async () => {
      await heroDetailsPage.clickSaveButton();
      await browser.wait(ExpectedConditions.urlIs(browser.baseUrl + "/heroes"), 5000);
    });
    
    it('heroes page should contain updated hero', async () => {
      await heroDetailsPage.clickSaveButton();
      await browser.wait(ExpectedConditions.urlContains("/heroes"), 5000);
      
      expect(parseInt(await heroPage.getHeroIdText(0))).toEqual(11);
      expect(await heroPage.getHeroNameText(0)).toEqual('Cool Dude');
    });
  
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
