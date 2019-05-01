import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo() {
    return await browser.get(browser.baseUrl);
  }

  async getTitleText() {
    return await element(by.css('app-root h1')).getText();
  }
  
  getNavElts() {
    return element.all(by.css('app-root nav a'));
  }
  
  getAppDashboard() {
    return element(by.css('app-root app-dashboard'));
  }
  
  getTopHeroes() {
    return element.all(by.css('app-root app-dashboard > div h4'));
  }
  
  getAppHeroes() {
    return element(by.css('app-root app-heroes'));
  }
  
  getAllHeroes() {
    return element.all(by.css('app-root app-heroes li'));
  }
  
  getSearchBox() {
    return element(by.css('#search-box'));
  }
  
  getSearchResults() {
    return element.all(by.css('.search-result li'));
  }
  
  getPageElts() {
    let navElts = element.all(by.css('app-root nav a'));

    return {
      navElts: navElts,

      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      topHeroes: element.all(by.css('app-root app-dashboard > div h4')),

      appHeroesHref: navElts.get(1),
      appHeroes: element(by.css('app-root app-heroes')),
      allHeroes: element.all(by.css('app-root app-heroes li')),
      selectedHeroSubview: element(by.css('app-root app-heroes > div:last-child')),

      heroDetail: element(by.css('app-root app-hero-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }
}
