import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Hero } from './hero';
import { HeroService } from './hero.service';

describe('HeroesService (with mocks)', () => {
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ HeroService ]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// HeroService method tests begin ///
  describe('#getHeroes', () => {
    let expectedHeroes: Hero[];

    beforeEach(() => {
      heroService = TestBed.get(HeroService);
      expectedHeroes = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
       ] as Hero[];
    });

    it('should return expected heroes (called once)', () => {
      heroService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedHeroes);
    });

    it('should be OK returning no heroes', () => {
      heroService.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(0, 'should have empty heroes array'),
        fail
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl);
      req.flush([]); // Respond with no heroes
    });

    it('should return expected heroes (called multiple times)', () => {
      heroService.getHeroes().subscribe();
      heroService.getHeroes().subscribe();
      heroService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      const requests = httpTestingController.match(heroService.heroesUrl);
      expect(requests.length).toEqual(3, 'calls to getHeroes()');

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedHeroes);
    });
  });
  
  describe('#updateHero', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${heroService.heroesUrl}/?id=${id}`;

    it('should update a hero and return it', () => {

      const updateHero: Hero = { id: 1, name: 'A' };

      heroService.updateHero(updateHero).subscribe(
        data => expect(data).toEqual(updateHero, 'should return the hero'),
        fail
      );

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateHero });
      req.event(expectedResponse);
    });
  });
  
  describe('#deleteHero', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${heroService.heroesUrl}/${id}`;

    it('should delete a hero', () => {

      const deleteHero: Hero = { id: 1, name: 'A' };

      heroService.deleteHero(deleteHero).subscribe(
        data => expect(data).toEqual(deleteHero, 'should return the deleted hero'),
        fail
      );

      // HeroService should have made one request to DELETE hero
      const req = httpTestingController.expectOne(makeUrl(1));
      expect(req.request.method).toEqual('DELETE');
      //expect(req.request.body).toEqual(deleteHero);

      // Expect server to return the hero after DELETE
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: deleteHero });
      req.event(expectedResponse);
    });
  });
});