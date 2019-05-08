import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class HeroesPage {
  
  async navigateTo(): Promise<any> {
    return await browser.get('/heroes');
  }
  
  async getTitleText(): Promise<string> {
    return await (await element(by.css('#app-heroes-title'))).getText();
  }
  
  getHeroes(): ElementArrayFinder {
    return element.all(by.css('.hero a'));
  }
  
  async clickHero(index): Promise<void> {
    let heroListItems: ElementArrayFinder = this.getHeroes();
    await heroListItems.get(index).click();
  }
  
  async getHeroIdText(index): Promise<string> {
    let heroListItems: ElementArrayFinder = this.getHeroes();
    return await heroListItems.get(index).element(by.css('.badge')).getText();
  }
  
  async getHeroNameText(index): Promise<string> {
    let heroListItems: ElementArrayFinder = this.getHeroes();
    let idText = await this.getHeroIdText(index);
    let anchorText = await (await heroListItems.get(index)).getText();
    // E.g. extract "Mr. Nice" from "11 Mr. Nice"
    return anchorText.substr(idText.length + 1);
  } 
}