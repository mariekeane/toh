import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Blue Raja' },
      { id: 2, name: 'Bowler' },
      { id: 3, name: 'Shoveler' },
      { id: 4, name: 'Mr. Furious' },
      { id: 5, name: 'Invisible Boy' },
      { id: 6, name: 'The Waffler' },
      { id: 7, name: 'Karma' },
      { id: 8, name: 'Skyfire' },
      { id: 9, name: 'Tunnel Rat' },
      { id: 10, name: 'Graveyard' },
      { id: 11, name: 'Vigil' },
      { id: 12, name: 'Flashbang' },
      { id: 13, name: 'Freefall' },
      { id: 14, name: 'Hellbelle' },
      { id: 15, name: 'Wraith' },
      { id: 16, name: 'Ace' },
      { id: 17, name: 'Warlock' },
      { id: 18, name: 'Grendel' },
      { id: 19, name: 'Rook' },
      { id: 20, name: 'Tinman' }
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
