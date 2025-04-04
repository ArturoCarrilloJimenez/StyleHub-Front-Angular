import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCharacterText',
  standalone: true,
})
export class LimitCharacterTextPipe implements PipeTransform {
  transform(value: string | null, numCharacter: number): unknown {
    if (!value) value = '';
    return value.length > numCharacter
      ? `${value.substring(0, numCharacter)}...`
      : value;
  }
}
