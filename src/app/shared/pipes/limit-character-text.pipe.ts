import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCharacterText',
  standalone: true
})
export class LimitCharacterTextPipe implements PipeTransform {

  transform(value: string, numCharacter: number): unknown {
    return value.length > numCharacter
      ? `${value.substring(0, numCharacter)}...`
      : value;
  }

}
