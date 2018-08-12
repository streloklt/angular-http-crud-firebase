import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes: any[] = [];
  loading = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes().subscribe(data => {
      setTimeout(() => {
        this.heroes = data.json();
        this.loading = false;
      }, 3000);
      
    });
  }

  ngOnInit() {
  }

  borrarHeroe(key$: string) {
    this._heroesService.borrarHeroe(key$).subscribe(data => {
      if (data.json()) {
        console.log(data.json());
      } else {
        delete this.heroes[key$];
      }
    });
  }

}
