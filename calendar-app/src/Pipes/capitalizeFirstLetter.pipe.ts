import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class capitalizeFirstLetter implements PipeTransform {
  transform(value: any) {
    var firstLetter: string = value.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    var restOfString: string = value.slice(1);
    return (firstLetter + restOfString);
  }
}
