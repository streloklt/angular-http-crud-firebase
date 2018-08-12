import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {
  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo = false;
  id: string;

  constructor(private _heroeService: HeroesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];

      if (this.id !== 'nuevo') {
        _heroeService.getHeroe(this.id).subscribe(data => {
          this.heroe = data.json();
        });
      }
    });
  }

  ngOnInit() {
  }

  guardar() {
    if (this.id === 'nuevo') {
      this._heroeService.nuevoHeroe(this.heroe)
        .subscribe(data => {
          this.router.navigate(['/heroe', (data.json()).name]);
        }, error => console.log(error));
    } else {
      this._heroeService.actualizarHeroe(this.heroe, this.id)
        .subscribe(data => {
          console.log(data.json());
        }, error => console.log(error));
    }
  }

  agregarNuevo(form: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);

    form.reset({
      casa: 'Marvel'
    });
  }
}
