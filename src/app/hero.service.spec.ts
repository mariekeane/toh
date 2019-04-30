import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;

  let sampleData: Hero[] = [
    { id: 1, name: 'Forbush Man', skills: ['surviving rejection'], appointments: [{ date: new Date(1 / 1 / 2020), location: 'blah' }, { date: new Date(2 / 2 / 2020), location: 'blah' }] },
    { id: 2, name: 'Beeblebrox', skills: ['fashion sense', 'second head'], appointments: [{ date: new Date(3 / 3 / 2020), location: 'blah' }, { date: new Date(4 / 4 / 2019), location: 'blah' }] },
    { id: 3, name: 'Ted', skills: [], appointments: [] }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService
      ]
    });
    service = TestBed.get(HeroService);
  });

  /*
  it('should be able to add a hero', () => {
    service.addHero({ name: 'Forbush Man', id: 0, skills: ['surviving rejection'], appointments: [{ date: new Date(7 / 4 / 19), location: 'Idaho Falls, ID' }] });
    var whoIsThere = service.searchHeroes('Forbush Man');
    expect(whoIsThere[0].id == 0);
  });

  it('should get update heroes', () => {
    service.updateHero({ name: 'Forbush Man', id: 0, skills: ['surviving rejection'], appointments: [{ date: new Date(7 / 4 / 19), location: 'Idaho Falls, ID' }] });

  });

  it('should be able to get heroes by name fragment', () => {

  });

  it('should be able to get heroes by skill fragment', () => {

  });

  it('should be able to delete heroes', () => {


  });

  */



}); // end of describe


