import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class DashboardPage {
  async navigateTo() {
    return await browser.get(browser.baseUrl);
  }

  async getTitleText() {
    return await element(by.css('app-root h1')).getText();
  }

  getAppDashboard() {
    return element(by.css('app-root app-dashboard'));
  }

  getTopHeroes(): ElementArrayFinder {
    return element.all(by.css('.heroName'));
  }

  getHeroSearchInput(): ElementFinder {
    return element(by.id('search-box'));
  }

  getSkillSearchInput(): ElementFinder {
    return element(by.id('skill-search-box'));
  }

  getMessages(): ElementArrayFinder {
    return element.all(by.css('.messagesHere'));
  }

  async getMessageContent(index: number): Promise<string> {
    return await this.getMessages().get(index).getText();
  }


  getMessageClearButton(): ElementFinder {
    return element(by.css('.clearButton'));
  }

  async clickMessageClearButton(): Promise<void> {
    let clearButton = this.getMessageClearButton();
    await clearButton.click();
  }

} // end of DashboardPage class


