import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class HeroDetailPage {
  private id;

  constructor(id = 0) {
    this.id = id;
  }

  async navigateTo(): Promise<any> {
    return await browser.get(`/detail/${this.id}`);
  }

  async getTitleText(): Promise<string> {
    return await element(by.css('#hero-details-title')).getText();
  }

  getNameInput(): ElementFinder {
    return element(by.css('#name-input'));
  }

  async updateNameInput(text: string): Promise<void> {
    let nameInput = await this.getNameInput();
    await nameInput.clear();
    await nameInput.sendKeys(text);
  }

  /* Save Button */
  getSaveButton(): ElementFinder {
    return element(by.css('#saveHero'));
  }

  async clickSaveButton(): Promise<void> {
    let saveButton = this.getSaveButton();
    await saveButton.click();
  }

  /* Cancel Button */
  getCancelButton(): ElementFinder {
    return element(by.css('#goBack'));
  }

  async clickCancelButton(): Promise<void> {
    let cancelButton = this.getCancelButton();
    await cancelButton.click();
  }

} // end of HeroDetailPage class


