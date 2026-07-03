import { Component, Input } from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon.model';
import { formatHeightInMeters, formatWeightInKg } from '../../utils/pokemon-format.utils';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon!: Pokemon;

  get formattedHeight(): string {
    return formatHeightInMeters(this.pokemon.height);
  }

  get formattedWeight(): string {
    return formatWeightInKg(this.pokemon.weight);
  }
}
