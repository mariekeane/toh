import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

describe('HeroesService', () => {
  let heroservice: HeroService;
  let httptestingcontroller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService
      ]
    });
    httptestingcontroller = TestBed.get(HttpTestingController);
    heroservice = TestBed.get(HeroService);
    // variable declared above, just doing this to zero it out right
  });

  afterEach(() => {
    httptestingcontroller.verify();
    //? 'verify that no unmatched requests are outstanding'
  })

  // HEROSERVICE METHOD TESTS

  describe('#getheroes', () => {
    let expectedHeroes: Hero[];
    //? Is the hashtag before getheroes just a visual indicator to coders

    beforeEach(() => {
      heroservice = TestBed.get(HeroService);
      expectedHeroes = [
        { id: 1, name: 'Forbush Man', skills: ['surviving rejection'], appointments: [{ date: new Date(1 / 1 / 2020), location: 'blah' }, { date: new Date(2 / 2 / 2020), location: 'blah' }] },
        { id: 2, name: 'Beeblebrox', skills: ['fashion sense', 'second head'], appointments: [{ date: new Date(3 / 3 / 2020), location: 'blah' }, { date: new Date(4 / 4 / 2019), location: 'blah' }] },
        { id: 3, name: 'Ted', skills: [], appointments: [] }
      ] as Hero[];
    });

    it('should return summoned hero (just one call)', () => {
      heroservice.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return summoned heroes'),
        fail
      );

      // HeroService should have made one GET request from expected URL
      const req = httptestingcontroller.expectOne(heroservice.heroesUrl);
      expect(req.request.method).toEqual('GET');
      // respond with the mock heroes
      req.flush(expectedHeroes);
    });

    it('should be OK returning no heroes', () => {
      heroservice.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(0, 'should have empty heroes array'),
        fail
      );

      const req = httptestingcontroller.expectOne(heroservice.heroesUrl);
      expect(req.request.method).toEqual('GET');

      req.flush([]);
      //? Resolve the request by returning a body plus additional HTTP info ... if the request specifies an expected body type
    });

    //? This is actually counting as a fail, is it supposed to do that?
    //? Not matching predetermined error message in messages.spec.ts?
    it('safely return 404 error', () => {
      // const msg = '404 error';
      const msg = 'Deliberate 404';
      heroservice.getHeroes().subscribe(
        heroes => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httptestingcontroller.expectOne(heroservice.heroesUrl);
      expect(req.request.method).toEqual('GET');

      // respond with 404 and error message in body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return expected heroes (multiple calls)', () => {
      heroservice.getHeroes().subscribe();
      heroservice.getHeroes().subscribe();
      heroservice.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      const requests = httptestingcontroller.match(heroservice.heroesUrl);
      expect(requests.length).toEqual(3, 'calls made to getHeroes()');

      // respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'Bobo the clown' }]);
      requests[2].flush(expectedHeroes);
    });

  }); // end of getHeroes describe

  // GET API/HEROES/ID

  describe('#getHero', () => {
    let expectedHero: Hero;
    const makeUrl = (id: number) => `${heroservice.heroesUrl}/${id}`;

    beforeEach(() => {
      heroservice = TestBed.get(HeroService);
      expectedHero = { id: 1, name: 'A' } as Hero;
    });

    it('should return expected hero (called once)', () => {
      heroservice.getHero(1).subscribe(
        hero => expect(hero).toEqual(expectedHero, 'should return expected hero'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httptestingcontroller.expectOne(makeUrl(1));
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedHero);
    });
  });

  // GET SEARCH api/heroes/?name={term}

  describe('#searchHeroes', () => {
    let expectedHeroes: Hero[];
    const makeUrl = (term: string) => `${heroservice.heroesUrl}/?name=${term}`;

    beforeEach(() => {
      heroservice = TestBed.get(HeroService);

      expectedHeroes = [
        { id: 1, name: 'Aaa' }  ,
        { id: 2, name: 'Aaab' } ,
        { id: 3, name: 'Baaab' },
        { id: 4, name: 'Baaa' } ,
      ] as Hero[];
    });

    it('should return expected heroes (called once)', () => {
      heroservice.searchHeroes('aaa').subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httptestingcontroller.expectOne(makeUrl('aaa'));
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedHeroes);
    });

    it('should be OK returning no heroes', () => {
      heroservice.searchHeroes('').subscribe(
        heroes => expect(heroes.length).toEqual(0, 'should have empty heroes array'),
        fail
      );
    });
  });

  // PUT api/heroes/id

  describe('#updateHero', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${heroservice.heroesUrl}/${id}`;

    it('should update a hero and return it', () => {

      const updateHero: Hero = { id: 1, name: 'A', skills: [], appointments: [] };

      heroservice.updateHero(updateHero).subscribe(
        data => expect(data).toEqual(updateHero, 'should return the hero'),
        fail
      );

      // HeroService should have made one request to PUT hero
      const req = httptestingcontroller.expectOne(heroservice.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateHero });
      req.event(expectedResponse);
    });

    //? 
    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const updateHero: Hero = { id: 1, name: 'A', skills: [], appointments: [] };
      heroservice.updateHero(updateHero).subscribe(
        heroes => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httptestingcontroller.expectOne(heroservice.heroesUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should turn network error into user-facing error', () => {
      const emsg = 'simulated network error';

      const updateHero: Hero = { id: 1, name: 'A', skills: [], appointments: [] };
      heroservice.updateHero(updateHero).subscribe(
        heroes => fail('expected to fail'),
        error => expect(error.message).toContain(emsg)
      );

      const req = httptestingcontroller.expectOne(heroservice.heroesUrl);

      // did not type a part here because description said it was optional
    });
  });

  // DELETE api/heroes/id

  describe('#deleteHero', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${heroservice.heroesUrl}/${id}`;

    it('should delete a hero', () => {

      const deleteHero: Hero = { id: 1, name: 'A', skills: [], appointments: [] };

      heroservice.deleteHero(deleteHero).subscribe(
        data => expect(data).toEqual(deleteHero, 'should return the deleted hero'),
        fail
      );

      // HeroService should have made one request to DELETE hero
      const req = httptestingcontroller.expectOne(makeUrl(1));
      expect(req.request.method).toEqual('DELETE');
      //expect(req.request.body).toEqual(deleteHero);

      // Expect server to return the hero after DELETE
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: deleteHero });
      req.event(expectedResponse);
    });
  });

  // POST api/heroes

  describe('#addHero', () => {
    // Expecting the query form of URL so should not 404 when id not found

    it('should add a hero', () => {

      let addHero: Hero = { id: 1, name: 'A', skills: [], appointments: [] };

      heroservice.addHero(addHero).subscribe(
        data => expect(data).toEqual(addHero, 'should return the added hero'),
        fail
      );

      // HeroService should have made one request to POST hero
      const req = httptestingcontroller.expectOne(heroservice.heroesUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addHero);

      // Expect server to return the hero after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: addHero });
      req.event(expectedResponse);
    });

  }); // end of addHero




}); // end of HeroService


