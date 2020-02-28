import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaStrShort'
})
export class FechaStrShortPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
