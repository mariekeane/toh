import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Blue Raja', skills: ['throwing silverware','british accent'] },
      { id: 2, name: 'Bowler', skills: ['haunted bowling ball'] },
      { id: 3, name: 'Shoveler', skills: ['advanced shoveling','armored'] },
      { id: 4, name: 'Mr. Furious', skills: ['rage','mechanical skills'] },
      { id: 5, name: 'Invisible Boy', skills: ['invisibility','socially connected'] },
      { id: 6, name: 'The Waffler', skills: ['truth syrup'] },
      { id: 7, name: 'Karma', skills: ['probability manipulation','karmic detection'] },
      { id: 8, name: 'Skyfire', skills: ['flight','lightning'] },
      { id: 9, name: 'Tunnel Rat', skills: ['size manipulation','mechanic'] },
      { id: 10, name: 'Graveyard', skills: ['earth control', 'seismic sensory'] },
      { id: 11, name: 'Vigil', skills: ['advanced visual sensory'] },
      { id: 12, name: 'Flashbang', skills: ['stun ability'] },
      { id: 13, name: 'Freefall', skills: ['flight','gravity manipulation'] },
      { id: 14, name: 'Hellbelle', skills: ['sound control'] },
      { id: 15, name: 'Wraith', skills: ['phasing','invisibility'] },
      { id: 16, name: 'Ace', skills: ['precognition','postcognition','probability manipulation'] },
      { id: 17, name: 'Warlock', skills: ['telekinesis','telesensory'] },
      { id: 18, name: 'Grendel', skills: ['shapeshifting','regeneration','water breathing'] },
      { id: 19, name: 'Rook', skills: ['earth control','armored'] },
      { id: 20, name: 'Tinman', skills: ['martial arts','multilingual','mechanic'] }
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
