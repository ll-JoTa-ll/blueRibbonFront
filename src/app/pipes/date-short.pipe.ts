import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateShort'
})
export class DateShortPipe implements PipeTransform {

  transform(value: any): any {

    if (value.length >= 10) {
      return value.substring(0, 10);
    }
  }

}
