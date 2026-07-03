import { Pipe, PipeTransform } from '@angular/core';
import { capitalizeFirst } from '../../utils/pokemon-format.utils';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return capitalizeFirst(value);
  }
}
