import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class HeroesService {
  fireUrl = 'https://heroesapp-d3f67.firebaseio.com/heroes.json';
  heroeUrl = 'https://heroesapp-d3f67.firebaseio.com/heroes';

  constructor(private http: Http) { }

  nuevoHeroe(heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.fireUrl, body, {headers})
      .pipe(map(res => {
        return res;
      }));
  }

  actualizarHeroe(heroe: Heroe, key$: string) {
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroeUrl}/${key$}.json`;

    return this.http.put(url, body, {headers})
      .pipe(map(res => {
        return res;
      }));
  }

  getHeroe(key$: string) {
    let url = `${this.heroeUrl}/${key$}.json`;

    return this.http.get(url)
      .pipe(map(res => {
        return res;
      }));
  }

  getHeroes() {
    return this.http.get(this.fireUrl)
      .pipe(map(res => {
        return res;
      }));
  }

  borrarHeroe(key$: string) {
    let url = `${this.heroeUrl}/${key$}.json`;

    return this.http.delete(url)
      .pipe(map(res => {
        return res;
      }));
  }
}
